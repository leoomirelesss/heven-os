'use client';

import { useState } from 'react';
import { conversations } from '../../lib/mock-data/heven';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function InboxScreen() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [replied, setReplied] = useState<string[]>([]);
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  return (
    <div className="grid gap-4 xl:grid-cols-[280px_1fr_320px]">
      <Card className="p-3 space-y-2">
        <h3 className="px-2 text-sm font-medium">Conversations</h3>
        {conversations.map((conversation) => (
          <button key={conversation.id} onClick={() => setActiveId(conversation.id)} className={`rounded-lg border border-white/10 p-3 text-left ${activeId===conversation.id ? 'bg-white/10':''}`}>
            <p className="text-sm">{conversation.name}</p><p className="text-xs text-muted">{conversation.channel} • {conversation.subject}</p>
          </button>
        ))}
      </Card>
      <Card className="p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Inbox</h2>
        <p className="text-sm text-muted">{active.preview}</p>
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm">AI suggested reply: We can absolutely help with that. I have updated your request and sent confirmation.</div>
        <Button variant="secondary" onClick={() => setReplied((v) => [...new Set([...v, active.id])])}>{replied.includes(active.id) ? 'Replied' : 'Send suggested reply'}</Button>
      </Card>
      <Card className="p-4 space-y-2"><h3 className="font-medium">Customer context</h3><p className="text-sm text-muted">{replied.includes(active.id) ? '✅ Marked as replied' : 'Pending reply'}</p></Card>
    </div>
  );
}
