import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  date: string;
  message: string;
  response?: string;
  status: 'pendente' | 'respondido';
}

const mockMessages: Message[] = [
  {
    id: '1',
    date: '15/01/2025',
    message: 'Gostaria de adicionar aulas de Zumba ao meu plano',
    response: 'Olá! Ficamos felizes com seu interesse. Entre em contato com a recepção para upgrade.',
    status: 'respondido',
  },
  {
    id: '2',
    date: '10/01/2025',
    message: 'Qual o horário de funcionamento nos finais de semana?',
    response: 'Funcionamos aos sábados das 8h às 14h. Domingos fechados.',
    status: 'respondido',
  },
];

export function SupportChat() {
  const [messages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Mensagem enviada!",
      description: "Nossa equipe responderá em breve.",
    });
    setNewMessage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suporte ao Cliente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
            />
            <Button onClick={handleSendMessage} className="w-full gap-2">
              <Send className="w-4 h-4" />
              Enviar Mensagem
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Histórico de Mensagens</h4>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border-l-4 border-primary pl-4 py-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{msg.date}</span>
                </div>
                <Badge variant={msg.status === 'respondido' ? 'default' : 'secondary'}>
                  {msg.status === 'respondido' ? 'Respondido' : 'Pendente'}
                </Badge>
              </div>
              <p className="text-sm font-medium">{msg.message}</p>
              {msg.response && (
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <strong>Resposta:</strong> {msg.response}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
