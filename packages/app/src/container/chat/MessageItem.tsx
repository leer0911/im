import React from 'react';
import { MESSAGE_TYPE } from '@im/helper';
import { MessageText, MessageMedia, MessageSystem } from '@im/component';
import { Message } from './store';
import { useChatStore } from './store';

interface Props {
  data: Message;
}

const renders = {
  [MESSAGE_TYPE.TEXT_SIMPLE]: {
    render(props: any) {
      return <MessageText {...props.commonProps}>{props.content.text}</MessageText>;
    },
  },
  [MESSAGE_TYPE.IMAGE_SIMPLE]: {
    render(props: any) {
      return (
        <MessageMedia {...props.commonProps}>
          <img src={props.content.image} alt="" />
        </MessageMedia>
      );
    },
  },
  [MESSAGE_TYPE.SYSTEM_TEXT_SIMPLE]: {
    render(props: any) {
      return <MessageSystem message={props.content.text} />;
    },
  },
};

export default function ContainerMessageItem(props: Props) {
  const { state } = useChatStore();
  const { type, userId = '', isOwner, ...restProps } = props.data;
  const { avatar = '', name = '' } = state.members[userId] || {};
  const commonProps = { reverse: isOwner, name, avatar };

  if (!renders[type]) {
    return null;
  }

  return renders[type].render({ ...restProps, commonProps });
}
