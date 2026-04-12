const HTMLSEO = ({
  title = 'AI Powered Learning Assistant',
  description = '',
}) => {
  return (
    <>
      <title>{`${title} | AI Powered Learning Assistant`}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
};

export default HTMLSEO;
