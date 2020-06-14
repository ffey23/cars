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

}

decorate(InterfaceStore, {
  notification: observable,
  pushNotification: action,
});

export default InterfaceStore;
