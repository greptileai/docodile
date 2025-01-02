'use client';

import { useEffect, useState } from 'react';
import {
  EditorContent,
  EditorRoot,
  type JSONContent,
} from "novel";
import { defaultEditorContent } from '@/lib/content';
import { defaultExtensions } from '@/lib/extensions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Home() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [initialContent, setInitialContent] = useState<null | JSONContent>(null);

  const extensions = [...defaultExtensions];

  useEffect(() => {
    const content = window.localStorage.getItem("novel-content");
    if (content) setInitialContent(JSON.parse(content));
    else setInitialContent(defaultEditorContent);
  }, []);

  if (!initialContent) return null;

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
              <SheetHeader>
                  <SheetTitle>Repository History</SheetTitle>
              </SheetHeader>
              {/* Sidebar content */}
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
            initialContent={initialContent}
            extensions={extensions}
            className="min-h-[500px] border rounded-lg"
          />
        </EditorRoot>
      </main>
    </div>
  );
}
