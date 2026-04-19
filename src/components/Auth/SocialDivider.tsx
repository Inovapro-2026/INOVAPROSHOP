import React from 'react';

export const SocialDivider = () => {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-slate-100"></span>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-4 text-slate-300 font-black tracking-widest">ou</span>
      </div>
    </div>
  );
};
