import React from 'react';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ApprovalNotification, usePositionApproval } from '@/context/PositionApprovalContext';

function NotificationItem({ notification }: { notification: ApprovalNotification }) {
  const { selectedId, selectNotification } = usePositionApproval();
  const isNew = notification.group === 'new';
  const isSelected = isNew && selectedId === notification.id;

  const handleClick = () => {
    if (isNew) {
      selectNotification(notification.id);
    } else {
      toast('Already reviewed');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'border border-border rounded-lg p-[9px_10px] mb-[6px] transition-colors animate-in fade-in slide-in-from-bottom-1',
        isNew ? 'cursor-pointer hover:bg-muted/50' : 'cursor-default opacity-70',
        isSelected && 'border-l-[2.5px] border-l-primary rounded-l-none bg-muted/40'
      )}
    >
      <div className="flex items-start gap-2">
        <span
          className={cn(
            'mt-[5px] h-[6px] w-[6px] rounded-full shrink-0',
            notification.isRead ? 'bg-border' : 'bg-primary'
          )}
        />
        <div className="flex-1 min-w-0 space-y-1">
          <span className="text-[11px] font-medium text-foreground line-clamp-2 leading-[1.3] block">
            {notification.title}
          </span>
          {notification.deptBadge && (
            <span className="inline-flex items-center rounded-full bg-[#EEEDFE] px-[6px] py-[1px] text-[9px] font-medium text-[#3C3489]">
              {notification.deptBadge}
            </span>
          )}
          {notification.earlierBadge && (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-[6px] py-[1px] text-[9px] font-medium',
                notification.earlierBadge.className
              )}
            >
              {notification.earlierBadge.label}
            </span>
          )}
          <p className="text-[10px] text-muted-foreground">
            {notification.sender} · {notification.timestamp}
          </p>
          {isNew && (
            <button
              onClick={(e) => { e.stopPropagation(); selectNotification(notification.id); }}
              className="mt-1.5 inline-flex items-center gap-1 bg-primary text-white text-[10px] font-medium px-[10px] py-[5px] rounded-[7px] hover:opacity-90 transition-opacity"
            >
              <Sparkles className="h-[9px] w-[9px]" />
              AI Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function PositionApprovalNotificationList() {
  const { notifications } = usePositionApproval();
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const newItems = notifications.filter((n) => n.group === 'new');
  const earlierItems = notifications.filter((n) => n.group === 'earlier');

  return (
    <div className="h-full flex flex-col w-[190px] flex-shrink-0 border-r border-border">
      <div className="border-b border-border p-3.5 space-y-1 shrink-0">
        <h2 className="font-sora text-[12px] font-medium text-foreground">Notifications</h2>
        <p className="text-[10px] text-muted-foreground">{unreadCount} unread · new positions</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {newItems.length > 0 && (
          <div className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-muted-foreground mb-1">
            New positions
          </div>
        )}
        {newItems.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}

        {earlierItems.length > 0 && (
          <div className="px-1 pt-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-muted-foreground mb-1">
            Earlier
          </div>
        )}
        {earlierItems.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default PositionApprovalNotificationList;
