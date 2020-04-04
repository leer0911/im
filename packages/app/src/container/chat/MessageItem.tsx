import React from 'react';
import { MESSAGE_TYPE } from '@im/helper';
import { MessageText, MessageMedia, MessageSystem } from '@im/component';

interface Props {
  data: {
    type: string;
    content?: any;
    avatar?: string;
    name?: string;
    userId?: string;
  };
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
          <img src={props.content.image} />
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
  const { type, userId, avatar, name, ...restProps } = props.data;
  // 假设没有 userId 表示为系统消息
  const commonProps = userId ? { reverse: userId === '2', avatar, name } : {};

  if (!renders[type]) {
    return null;
  }

  return renders[type].render({ ...restProps, commonProps });
}
