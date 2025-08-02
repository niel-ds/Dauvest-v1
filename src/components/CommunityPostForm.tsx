import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface CommunityPostFormProps {
  onPostCreated: () => void;
}

export function CommunityPostForm({ onPostCreated }: CommunityPostFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim() || !user) return;

    setLoading(true);
    
    const { error } = await (supabase as any)
      .from('community_posts')
      .insert({
        content: content.trim(),
        author_id: user.id
      });

    if (error) {
      toast({
        title: "Erro ao criar post",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setContent("");
      toast({
        title: "Post criado!",
        description: "Sua pergunta foi publicada na comunidade.",
      });
      onPostCreated();
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <Textarea
            placeholder="Tem alguma dúvida sobre finanças? Compartilhe com a comunidade..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit} 
              disabled={!content.trim() || loading}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {loading ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}