import React from 'react';
import { MESSAGE_TYPE } from '@im/helper';
import { MessageText, MessageMedia, MessageSystem } from '@im/component';

interface Props {
  data: {
    type: string;
    content?: any;
    avatar?: string;
    username?: string;
    userId?: string;
    isUser: boolean;
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
  const { type, avatar, isUser, username, ...restProps } = props.data;
  // 假设没有 userId 表示为系统消息
  const commonProps = username ? { reverse: isUser, avatar, name: username } : {};

  if (!renders[type]) {
    return null;
  }

  return renders[type].render({ ...restProps, commonProps });
}
