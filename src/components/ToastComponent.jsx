import React, { useEffect } from 'react';
import { ToastContainer, ToastMessageAnimated } from 'react-toastr';
import 'animate.css/animate.compat.css';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { instanceOf } from 'prop-types';
import InterfaceStore from '../stores/InterfaceStore';
import styles from './ToastComponent.module.scss';

// const ToastMessageFactory = React.createFactory(ToastMessage.animation);

function ToastComponent({ interfaceStore }) {
  let container;
  useEffect(() => {
    const disposer = reaction(() => interfaceStore.notification, (notification) => {
      if (notification.type === 'success') {
        container.success(
          notification.message,
          notification.title,
          { closeButton: true, timeout: 3000, className: styles.toastSuccess },
        );
      } else {
        container.error(
          notification.message,
          notification.title,
          { closeButton: true, timeOut: 3000, className: styles.toastError },
        );
      }
    });
    return () => {
      disposer();
    };
  });
  return (
    <div>
      <ToastContainer
        ref={(ref) => {
          container = ref;
          return ref;
        }}
        toastMessageFactory={React.createFactory(ToastMessageAnimated)}
        className={styles.container}
      />
    </div>
  );
}

ToastComponent.propTypes = {
  interfaceStore: instanceOf(InterfaceStore).isRequired,
};

export default inject('interfaceStore')(observer(ToastComponent));
