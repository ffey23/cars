import React, { useEffect } from 'react';
import { ToastContainer, ToastMessageAnimated } from 'react-toastr';
import 'animate.css/animate.compat.css';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { instanceOf } from 'prop-types';
import InterfaceStore from '../stores/InterfaceStore';

// const ToastMessageFactory = React.createFactory(ToastMessage.animation);

function ToastComponent({ interfaceStore }) {
  let container;
  useEffect(() => {
    const disposer = reaction(() => interfaceStore.notification, (notification) => {
      if (notification.type === 'success') {
        container.success(notification.message, notification.title, { closeButton: true, timeOut: 3000, className: 'toast-top-right' });
      } else {
        container.error(notification.message, notification.title, { closeButton: true, timeOut: 3000, className: 'toast-top-right' });
      }
    });
    return () => {
      disposer.dipose();
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
      />
    </div>
  );
}

ToastComponent.propTypes = {
  interfaceStore: instanceOf(InterfaceStore).isRequired,
};

export default inject('interfaceStore')(observer(ToastComponent));
