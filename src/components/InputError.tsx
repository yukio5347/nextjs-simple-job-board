export default function InputError({
  message,
  className = '',
  ...props
}: {
  message: string | undefined;
  className?: string;
}) {
  return message ? (
    <p {...props} className={'text-sm text-red-600 dark:text-red-400 ' + className}>
      {message}
    </p>
  ) : null;
}
