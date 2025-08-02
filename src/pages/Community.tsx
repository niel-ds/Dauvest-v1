import { useState, useEffect } from 'react';
import { CommunityPostForm } from '@/components/CommunityPostForm';
import { CommunityPost } from '@/components/CommunityPost';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PostData {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  likes_count: number;
  comments_count: number;
  profiles: {
    email: string;
  };
  is_liked_by_user: boolean;
  comments: Array<{
    id: string;
    content: string;
    created_at: string;
    author_email: string;
  }>;
}

export function Community() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    if (!user) return;

    const { data: postsData, error } = await (supabase as any)
      .from('community_posts')
      .select(`
        id,
        content,
        created_at,
        author_id,
        likes_count,
        comments_count,
        profiles!community_posts_author_id_fkey (
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    // Fetch likes and comments for each post
    const postsWithDetails = await Promise.all(
      (postsData || []).map(async (post: any) => {
        // Check if user liked this post
        const { data: likeData } = await (supabase as any)
          .from('likes')
          .select('id')
          .eq('post_id', post.id)
          .eq('user_id', user.id)
          .single();

        // Fetch comments with author info
        const { data: commentsData } = await (supabase as any)
          .from('comments')
          .select(`
            id,
            content,
            created_at,
            profiles!comments_author_id_fkey (
              email
            )
          `)
          .eq('post_id', post.id)
          .order('created_at', { ascending: true });

        return {
          ...post,
          is_liked_by_user: !!likeData,
          comments: (commentsData || []).map((comment: any) => ({
            id: comment.id,
            content: comment.content,
            created_at: comment.created_at,
            author_email: comment.profiles?.email || 'Usuário'
          }))
        };
      })
    );

    setPosts(postsWithDetails);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Comunidade Dauvest</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Comunidade Dauvest</h1>
      
      <CommunityPostForm onPostCreated={fetchPosts} />

      <div className="space-y-4">
        {posts.map((post) => (
          <CommunityPost
            key={post.id}
            id={post.id}
            content={post.content}
            authorEmail={post.profiles?.email || 'Usuário'}
            createdAt={post.created_at}
            likesCount={post.likes_count}
            commentsCount={post.comments_count}
            isLiked={post.is_liked_by_user}
            comments={post.comments}
            onUpdate={fetchPosts}
          />
        ))}
        
        {posts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum post ainda. Seja o primeiro a compartilhar!</p>
          </div>
        )}
      </div>
    </div>
  );
}