'use client';

import { useState } from 'react';
import {
  EditorBubble,
  EditorContent,
  EditorRoot
} from "novel";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Home() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-4">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              {/* Sidebar content */}
              <div className="flex flex-col gap-4 mt-8">
                <h2 className="text-lg font-semibold">Repository History</h2>
                {/* Add repository history here */}
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            <Input
              placeholder="Enter GitHub repository URL"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="flex-1"
            />
            <Button>Load</Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-4">
        <EditorRoot>
          <EditorContent 
            initialContent={[]}
            className="min-h-[500px] border rounded-lg"
          />
          <EditorBubble />
        </EditorRoot>
      </main>
    </div>
  );
}
