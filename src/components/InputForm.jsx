const InputForm = ({label, type, placeholder, onChange, name}) => {
    return (
        <div className="control">
            <label>{label}</label>
            <input type={type} placeholder={placeholder} onChange={onChange} name={name} required />
        </div>
    );
}

export default InputForm