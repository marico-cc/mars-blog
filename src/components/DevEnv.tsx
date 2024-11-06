export const DevEnv = () => {
  const isDev = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost' || window.location.hostname.includes('-sit');
  if (!isDev) {
    return null;
  }
  return (
    <div
      className={`pointer-events-none  fixed bottom-0 right-0 z-50 
                  box-border h-full w-full border-[4px] border-solid
                  border-red-500 text-center text-red-700 opacity-60`}>
      <div className={'text-red-400'}>测试环境</div>
    </div>
  );
};
