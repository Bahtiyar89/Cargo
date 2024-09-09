const FormRowValue = ({ type, name, labelText, onChange, value }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        value={value || ''}
        onChange={onChange}
        required
      />
    </div>
  );
};
export default FormRowValue;
