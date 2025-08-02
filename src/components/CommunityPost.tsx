import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Heart, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author_email: string;
}

interface CommunityPostProps {
  id: string;
  content: string;
  authorEmail: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  comments: Comment[];
  onUpdate: () => void;
}

export function CommunityPost({ 
  id, 
  content, 
  authorEmail, 
  createdAt, 
  likesCount, 
  commentsCount,
  isLiked,
  comments,
  onUpdate 
}: CommunityPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLike = async () => {
    if (!user) return;

    if (isLiked) {
      // Remove like
      await (supabase as any)
        .from('likes')
        .delete()
        .eq('post_id', id)
        .eq('user_id', user.id);
    } else {
      // Add like
      await (supabase as any)
        .from('likes')
        .insert({
          post_id: id,
          user_id: user.id
        });
    }

    onUpdate();
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    setLoading(true);
    
    const { error } = await (supabase as any)
      .from('comments')
      .insert({
        content: newComment.trim(),
        post_id: id,
        author_id: user.id
      });

    if (error) {
      toast({
        title: "Erro ao comentar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setNewComment("");
      toast({
        title: "Comentário adicionado!",
        description: "Seu comentário foi publicado.",
      });
      onUpdate();
    }

    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "agora";
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 48) return "1d";
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium">{authorEmail}</p>
              <span className="text-xs text-muted-foreground">
                {formatDate(createdAt)}
              </span>
            </div>
            <p className="text-sm mb-3">{content}</p>
            
            <div className="flex space-x-4 text-xs">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-1"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                {commentsCount}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-auto p-1 ${isLiked ? 'text-red-500' : ''}`}
                onClick={handleLike}
              >
                <Heart className={`h-3 w-3 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                {likesCount}
              </Button>
            </div>

            {showComments && (
              <div className="mt-4 space-y-3">
                {/* Add comment form */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Adicionar comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px] resize-none text-sm"
                  />
                  <Button 
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || loading}
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>

                {/* Comments list */}
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-medium">{comment.author_email}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-xs">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}