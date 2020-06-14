import {
  observable, action, decorate,
} from 'mobx';

class InterfaceStore {
    notification = null;

    pushNotification = ({ type = 'error', title, message }) => {
      const newTitle = title || (type === 'error' ? 'Error' : 'Success');
      const newMessage = message || (type === 'error' ? 'An error occurred!' : 'Action was succesfull!');
      this.notification = {
        type,
        title: newTitle,
        message: newMessage,
      };
    }

    loader = null;

    toggleLoader = (message) => {
      if (this.loader == null) {
        this.loader = { message };
      } else {
        this.loader = null;
      }
    }
}

decorate(InterfaceStore, {
  notification: observable,
  pushNotification: action,
  loader: observable,
  toggleLoader: action,
});

export default InterfaceStore;
