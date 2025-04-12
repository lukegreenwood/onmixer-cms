import { useMutation } from '@apollo/client';
import { Button } from '@soundwaves/components';

import { DELETE_SCHEDULE_ITEM } from '@/graphql/mutations/deleteScheduleItem';
import { UnscheduleIcon } from '@/icons';

interface ActionCellProps {
  scheduleItemId: string;
}

export const ActionCell = ({ scheduleItemId }: ActionCellProps) => {
  const [deleteScheduleItem] = useMutation(DELETE_SCHEDULE_ITEM);

  const handleDelete = () => {
    deleteScheduleItem({
      variables: { input: { id: scheduleItemId } },
    });
  };

  return (
    <div>
      <Button
        variant="outline"
        size="xs-icon"
        destructive
        isIconOnly
        before={<UnscheduleIcon />}
        onClick={handleDelete}
      />
    </div>
  );
};
