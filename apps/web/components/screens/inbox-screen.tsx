import { conversations } from '../../lib/mock-data/heven';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function InboxScreen() {
  const active = conversations[0];
  return (
    <div className="grid gap-4 xl:grid-cols-[280px_1fr_320px]">
      <Card className="p-3 space-y-2">
        <h3 className="px-2 text-sm font-medium">Conversations</h3>
        {conversations.map((conversation) => (
          <div key={conversation.id} className="rounded-lg border border-white/10 p-3">
            <p className="text-sm">{conversation.name}</p>
            <p className="text-xs text-muted">{conversation.channel} • {conversation.subject}</p>
          </div>
        ))}
      </Card>
      <Card className="p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Inbox</h2>
        <p className="text-sm text-muted">{active.preview}</p>
        <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">Customer: Can I switch to size 7 before shipment?</div>
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm">AI suggested reply: Absolutely — I updated your order to size 7 and sent confirmation by email.</div>
        <Button variant="secondary">Send suggested reply</Button>
      </Card>
      <Card className="p-4 space-y-2">
        <h3 className="font-medium">Customer context</h3>
        <p className="text-sm text-muted">VIP tier • 12 orders • Last purchase $124</p>
        <p className="text-sm text-muted">Prefers WhatsApp support and express shipping.</p>
      </Card>
    </div>
  );
}
