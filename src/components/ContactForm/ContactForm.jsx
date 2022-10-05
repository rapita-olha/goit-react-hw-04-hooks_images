import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.scss';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleBtnSubmit = e => {
    e.preventDefault();

    onSubmit(name, number);

    reset();
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  return (
    <form onSubmit={handleBtnSubmit} className={s.form} autoComplete="off">
      <label className={s.label}>
        Name
        <input
          autoFocus
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className={s.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Iмя може містити лиш букви, апостроф, тире і пропуск. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          className={s.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефону повинен містити цифри а також пропуски, тире, а також може починатись з +"
          required
        />
      </label>

      <button type="submit" className={s.btn}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
