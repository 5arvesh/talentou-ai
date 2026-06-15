import React from 'react';
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
        'rounded-card p-3 mb-2 transition-colors animate-in fade-in slide-in-from-bottom-1',
        isNew ? 'cursor-pointer hover:bg-muted/50' : 'cursor-default',
        isSelected && 'border-l-[3px] border-l-primary rounded-l-none bg-muted/40'
      )}
    >
      <div className="flex items-start gap-2">
        <span
          className={cn(
            'mt-1.5 h-1.5 w-1.5 rounded-full shrink-0',
            notification.isRead ? 'bg-border' : 'bg-primary'
          )}
        />
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12.5px] font-medium text-foreground line-clamp-1">{notification.title}</span>
          </div>
          {notification.deptBadge && (
            <span className="inline-flex items-center rounded-full bg-[#EEEDFE] px-2 py-0.5 text-[10px] font-medium text-[#3C3489]">
              {notification.deptBadge}
            </span>
          )}
          {notification.earlierBadge && (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium',
                notification.earlierBadge.className
              )}
            >
              {notification.earlierBadge.label}
            </span>
          )}
          <p className="text-[11px] text-muted-foreground">
            {notification.sender} · {notification.timestamp}
          </p>
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
    <div className="h-full flex flex-col w-[340px] flex-shrink-0 border-r border-border">
      <div className="border-b border-border p-3.5 space-y-1 shrink-0">
        <h2 className="font-sora text-[13px] font-medium text-foreground">Notifications</h2>
        <p className="text-[11px] text-muted-foreground">{unreadCount} unread · new positions</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {newItems.length > 0 && (
          <div className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            New positions
          </div>
        )}
        {newItems.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}

        {earlierItems.length > 0 && (
          <div className="px-1 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
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
