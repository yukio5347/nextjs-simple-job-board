const PrimaryButton = ({
  className = '',
  disabled,
  children,
  ...props
}: {
  className?: string;
  disabled: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <button
      {...props}
      className={
        `h-10 w-24 py-2 px-5 rounded-md bg-sky-500 text-white font-medium transition-colors hover:bg-sky-600 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
