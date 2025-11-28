import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useLocation
} from "react";
import themedSwal from "../utils/themedSwal";
import { useTheme } from "../context/ThemeContext";


const PinInputField = forwardRef(
  ({ value, onChange, onFocusNext, onFocusPrev }, ref) => {
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
      e.preventDefault();
      const newValue = e.target.value;
      if (newValue === "" || /^\d+$/.test(newValue)) {
        onChange(newValue);
        if (newValue !== "") {
          onFocusNext();
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Backspace" && value === "") {
        onFocusPrev();
      }
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

    return (
      <input
        ref={inputRef}
        type="text"
        maxLength="1"
        value={value}
        onChange={handleInputChange}
        onFocus={() => inputRef.current.select()}
        className="border-[1px] w-full dark:bg-neutral-800 dark:border-white border-neutral-700  text-center flex rounded-md  outline-none py-1 px-2 mx-2  my-2 "
        onKeyDown={handleKeyDown}
      />
    );
  }
);


const TransPinForm = ({ onSubmit, buttonText, loadingText, loading, setLoading }) => {
  const [pinValues, setPinValues] = useState(["", "", "", ""]);
  const inputRefs = useRef(Array(4).fill(null));
  // const [loading, setLoading] = useState(false)
  const { theme } = useTheme();

  const handlePinChange = (index, value) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
  };

  const handleFocusNext = (index) => {
    if (index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleFocusPrev = (index) => {
    if (index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pinValues.every((value) => value !== "")) {
      const pin = pinValues.join("");
      onSubmit(pin);
      setLoading(true)

    } else {
      setLoading(false)
      themedSwal({ icon: "error", title: "Failed", text: "Please fill in all PIN Fields" }, theme);



    }
  };

  return (
    <>
      <div>
        <div className="flex ">
          {[0, 1, 2, 3].map((index) => (
            <PinInputField
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={pinValues[index]}
              onChange={(value) => handlePinChange(index, value)}
              onFocusNext={() => handleFocusNext(index)}
              onFocusPrev={() => handleFocusPrev(index)}
            />
          ))}
        </div>
        <button
          className="bg-private disabled:opacity-60 rounded-md w-full text-center text-white py-2"
          onClick={handleSubmit}
          disabled={loading}
        >
       
          {loading ? (
                      <span>
                        {loadingText} <i className="fas fa-spinner fa-spin"></i>
                      </span>
                    ) : (
                      <span>{buttonText}</span>
                    )}
                  
        </button>
      </div>
    </>
  );
};

export default TransPinForm;
