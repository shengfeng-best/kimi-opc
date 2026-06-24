import { View, Text } from '@tarojs/components';
import './index.css';

interface ConfirmModalProps {
  visible: boolean;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  confirmType?: 'primary' | 'danger';
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ConfirmModal({
  visible,
  title = '提示',
  content,
  confirmText = '确定',
  cancelText = '取消',
  confirmType = 'primary',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!visible) return null;

  return (
    <View className="confirm-modal" onClick={onCancel}>
      <View className="confirm-modal__content" onClick={(e) => e.stopPropagation()}>
        <Text className="confirm-modal__title">{title}</Text>
        {content && <Text className="confirm-modal__text">{content}</Text>}
        <View className="confirm-modal__actions">
          <View className="confirm-modal__btn confirm-modal__btn--cancel" onClick={onCancel}>
            <Text>{cancelText}</Text>
          </View>
          <View className={`confirm-modal__btn confirm-modal__btn--confirm confirm-modal__btn--${confirmType}`} onClick={onConfirm}>
            <Text>{confirmText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
