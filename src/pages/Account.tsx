import { useState } from "react";
import { User, Settings, LogOut, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/auth");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minha Conta</h1>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-xl">
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">{user.email}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user.email}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Account Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Detalhes da Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>ID do Usuário</span>
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              {user.id.slice(0, 8)}...
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Membro desde</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(user.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>Email confirmado</span>
            </div>
            <span className={`text-sm ${user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}`}>
              {user.email_confirmed_at ? 'Sim' : 'Pendente'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair da Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;