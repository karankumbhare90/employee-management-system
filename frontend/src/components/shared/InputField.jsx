const InputField = ({
    id,
    type,
    labelText,
    icon: Icon,
    value,
    onChange,
    isFocused,
    setIsFocused,
}) => {
    return (
        <div
            className={`input-parent ${isFocused ? 'border-blue-600 border-2' : ''}`}
        >
            {Icon && (
                <Icon
                    fontSize={18}
                    className={`${isFocused ? 'text-blue-600' : 'text-gray-500'} flex items-center`}
                />
            )}
            <div className="input-child">
                <label
                    htmlFor={id}
                    className={`input-label ${isFocused
                        ? '-top-6 -left-1 bg-white text-sm text-blue-600'
                        : 'text-gray-500'
                        } ${value ? '-top-6 -left-1 bg-white text-sm' : ''}`}
                >
                    {labelText}
                </label>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => {
                        console.log('Input focused');
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        console.log('Input blurred');
                        setIsFocused(false);
                    }}
                    className={`input`}
                />
            </div>
        </div>
    );
};

export default InputField;