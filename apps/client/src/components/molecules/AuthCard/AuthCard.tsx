type Props = {
  children: React.ReactNode;
};

const AuthCard = ({ children }: Props) => {
  return (
    <section className="bg-background-secondary h-[60rem] rounded-lg shadow-custom text-center p-8">
      <div className="h-auto pt-[36%]">{children}</div>
    </section>
  );
};

export default AuthCard;
