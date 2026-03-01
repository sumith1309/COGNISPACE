'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn, formatRelativeTime, formatDate } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface MessageData {
  id: string;
  content: string;
  type: string;
  createdAt: string | Date;
  sender: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    role: string;
  };
}

interface ProjectChatProps {
  projectSlug: string;
  initialMessages: MessageData[];
  currentUserId: string;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getDateLabel(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return formatDate(date);
}

function shouldShowDateDivider(current: MessageData, previous: MessageData | undefined): boolean {
  if (!previous) return true;
  const currentDate = new Date(current.createdAt).toDateString();
  const previousDate = new Date(previous.createdAt).toDateString();
  return currentDate !== previousDate;
}

export function ProjectChat({
  projectSlug,
  initialMessages,
  currentUserId,
  className,
}: ProjectChatProps) {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  // Poll for new messages every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/v1/projects/${projectSlug}/messages`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data)) {
            setMessages(data.data as MessageData[]);
          }
        }
      } catch {
        // Silently fail polling
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [projectSlug]);

  async function handleSend() {
    const content = input.trim();
    if (!content || sending) return;

    setSending(true);
    try {
      const res = await fetch(`/api/v1/projects/${projectSlug}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        const newMessage = (await res.json()) as MessageData;
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    } catch {
      // Handle error silently
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900',
        className
      )}
    >
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '500px' }}>
        {messages.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-slate-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => {
              const prevMessage = index > 0 ? messages[index - 1] : undefined;
              const showDateDivider = shouldShowDateDivider(message, prevMessage);
              const isCurrentUser = message.sender.id === currentUserId;
              const isSystem = message.type === 'SYSTEM';

              return (
                <div key={message.id}>
                  {/* Date divider */}
                  {showDateDivider && (
                    <div className="my-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                      <span className="text-xs font-medium text-slate-400">
                        {getDateLabel(new Date(message.createdAt))}
                      </span>
                      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                    </div>
                  )}

                  {/* System message */}
                  {isSystem ? (
                    <div className="py-1 text-center text-xs text-slate-400 italic">
                      {message.content}
                    </div>
                  ) : (
                    <div className={cn('flex gap-3', isCurrentUser && 'flex-row-reverse')}>
                      <Avatar size="sm" className="mt-0.5 shrink-0">
                        {message.sender.avatarUrl ? (
                          <AvatarImage
                            src={message.sender.avatarUrl}
                            alt={message.sender.fullName}
                          />
                        ) : null}
                        <AvatarFallback>{getInitials(message.sender.fullName)}</AvatarFallback>
                      </Avatar>
                      <div className={cn('max-w-[75%]', isCurrentUser && 'items-end text-right')}>
                        <div className="mb-0.5 flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            {message.sender.fullName}
                          </span>
                          <span className="text-xs text-slate-400">
                            {formatRelativeTime(message.createdAt)}
                          </span>
                        </div>
                        <div
                          className={cn(
                            'inline-block rounded-2xl px-4 py-2 text-sm',
                            isCurrentUser
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                          )}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-700">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 resize-none rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:placeholder:text-slate-500"
            style={{ maxHeight: '120px' }}
          />
          <Button
            size="sm"
            onClick={() => void handleSend()}
            disabled={!input.trim() || sending}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
