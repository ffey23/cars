import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import InterfaceStore from '../../stores/InterfaceStore';
import styles from './Loader.module.scss';

function Loader({ interfaceStore }) {
  useEffect(() => {
    if (interfaceStore.loader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [interfaceStore.loader]);

  if (!interfaceStore.loader) return null;

  return (
    <div className={styles.loader}>
      <div className={styles.spinner}>
        <div className={styles.spinnerPart} />
        <div className={styles.spinnerPart} />
        <div className={styles.spinnerPart} />
        <div className={styles.spinnerPart} />
      </div>
      <div className={styles.message}>{interfaceStore.loader.message}</div>
    </div>
  );
}

Loader.propTypes = {
  interfaceStore: PropTypes.instanceOf(InterfaceStore).isRequired,
};

export default inject('interfaceStore')(observer(Loader));
