import React, { ReactNode } from 'react';
import Modal from '~/v4/core/components/Modal';
import { Button } from '~/v4/core/components/Button';
import clsx from 'clsx';
import styles from './styles.module.css';
import { ConfirmType, useConfirmContext } from '~/v4/core/providers/ConfirmProvider';
import { useAmityElement } from '~/v4/core/hooks/uikit/index';

interface ConfirmProps extends ConfirmType {
  className?: string;
  okText?: ReactNode;
  cancelText?: ReactNode;
  type?: 'confirm' | 'info';
}

const Confirm = ({
  pageId = '*',
  componentId = '*',
  elementId = '*',
  className,
  title,
  content,
  okText = 'Ok',
  onOk,
  cancelText = 'Cancel',
  onCancel,
  type = 'confirm',
}: ConfirmProps) => {
  const { accessibilityId, themeStyles } = useAmityElement({ pageId, componentId, elementId });
  return (
    <Modal
      className={clsx(className, styles.modal)}
      pageId={pageId}
      componentId={componentId}
      elementId={elementId}
      data-qa-anchor={`confirm-modal-${accessibilityId}`}
      title={title}
      footer={
        <div className={styles.footer}>
          {type === 'confirm' && (
            <Button
              className={styles.cancelButton}
              data-qa-anchor="confirm-modal-cancel-button"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          )}
          <Button
            className={styles.okButton}
            data-qa-anchor={`confirm-modal-${accessibilityId}-ok-button`}
            onClick={onOk}
          >
            {okText}
          </Button>
        </div>
      }
      onCancel={onCancel}
    >
      <div>{content}</div>
    </Modal>
  );
};

export const ConfirmComponent = () => {
  const { confirmData, closeConfirm } = useConfirmContext();

  if (!confirmData) return null;

  const onCancel = () => {
    closeConfirm();
    confirmData?.onCancel && confirmData.onCancel();
  };

  const onOk = () => {
    closeConfirm();
    confirmData?.onOk && confirmData.onOk();
  };

  return <Confirm {...confirmData} onCancel={onCancel} onOk={onOk} className={styles.background} />;
};

export default Confirm;
