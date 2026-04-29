'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { generationSteps } from '../../lib/mock-data/heven';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';

export function GenerationLoadingScreen() {
  const completed = 4;
  const pct = useMemo(() => Math.round((completed / generationSteps.length) * 100), [completed]);

  return (
    <div className="min-h-screen bg-surface px-6 py-20">
      <Card className="mx-auto max-w-2xl p-8 space-y-6">
        <h1 className="text-2xl font-semibold">Building your business OS...</h1>
        <p className="text-sm text-muted">This simulates the AI generation pipeline for the investor demo.</p>
        <Progress value={pct} />
        <div className="space-y-2">
          {generationSteps.map((step, idx) => (
            <div key={step} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm">
              <span>{step}</span>
              <span className="text-muted">{idx < completed ? 'Done' : idx === completed ? 'In progress' : 'Queued'}</span>
            </div>
          ))}
        </div>
        <Link href="/generated"><Button>Open Generated Business</Button></Link>
      </Card>
    </div>
  );
}
