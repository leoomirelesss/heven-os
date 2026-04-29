'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generationSteps } from '../../lib/mock-data/heven';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';

export function GenerationLoadingScreen() {
  const [completed, setCompleted] = useState(0);
  const router = useRouter();
  const pct = useMemo(() => Math.round((completed / generationSteps.length) * 100), [completed]);

  useEffect(() => {
    if (completed >= generationSteps.length) {
      const timeout = setTimeout(() => router.push('/generated'), 700);
      return () => clearTimeout(timeout);
    }
    const timer = setTimeout(() => setCompleted((s) => s + 1), 900);
    return () => clearTimeout(timer);
  }, [completed, router]);

  return (
    <div className="min-h-screen bg-surface px-6 py-20">
      <Card className="mx-auto max-w-2xl p-8 space-y-6">
        <h1 className="text-2xl font-semibold">Building your business OS...</h1>
        <Progress value={pct} />
        <div className="space-y-2">
          {generationSteps.map((step, idx) => (
            <div key={step} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm">
              <span>{step}</span>
              <span className="text-muted">{idx < completed ? 'Done' : idx === completed ? 'In progress' : 'Queued'}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
