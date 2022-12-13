import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import styles from '../../styles/topbar/Menu.module.css';

function handleClick(value) {
  console.log('clicked', value);
}

export default function Menu({ onClose }) {
  console.log('Menu rendered!');

  return (
    <>
      <div className={styles.menu}>
        <div className={[styles.subMenu, styles.units].join(' ')}>
          <Button title="Metric" onClick={() => handleClick('Metric')} />
          <Button title="Imperial" onClick={() => handleClick('Imperial')} />
        </div>
        <div className={[styles.subMenu, styles.theme].join(' ')}>
          <Button title="Light" onClick={() => handleClick('Light')} />
          <Button title="Jawa" onClick={() => handleClick('Jawa')} />
          <Button title="Dark" onClick={() => handleClick('Dark')} />
        </div>
        <div className={[styles.subMenu, styles.lang].join(' ')}>
          <Button title="English" onClick={() => handleClick('en')} />
          <Button title="French" onClick={() => handleClick('fr')} />
          <Button title="Swedish" onClick={() => handleClick('sv')} />
        </div>
      </div>
      <div
        className={styles.menuBlanket}
        onClick={onClose}
        // close menu when user tabs away
        role="button"
        tabIndex={0}
        onKeyDown={onClose}
        aria-label="close menu"
      />
    </>
  );
}

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
};