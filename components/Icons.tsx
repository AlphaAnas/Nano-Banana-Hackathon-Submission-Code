import React from 'react';

type IconProps = {
  className?: string;
};

export const GlassesIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9a4 4 0 100-8 4 4 0 000 8zM8 9h4m-4 0a4 4 0 100 8 4 4 0 000-8z" transform="translate(4, 4)"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 17a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

export const ShirtIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9l-6-6-6 6h12zm-2.45 2.11l-3.55-2.05-3.55 2.05a2 2 0 00-1 1.73V21h12v-8.16a2 2 0 00-1-1.73z" />
  </svg>
);

export const SofaIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 9H4a1 1 0 00-1 1v6a1 1 0 001 1h16a1 1 0 001-1v-6a1 1 0 00-1-1z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2M4 9V7a1 1 0 011-1h14a1 1 0 011 1v2" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10 0h3a1 1 0 001-1V10m-4 11h-4a1 1 0 01-1-1V15a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1z" />
  </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const SwitchCameraIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 4l-5 5M4 20l5-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 4h5v5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20H4v-5" />
    </svg>
);

export const LogoIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 3.104l7.466 4.21A2 2 0 0118 9.029v5.942a2 2 0 01-.784 1.715l-7.466 4.21a2 2 0 01-1.966 0l-7.466-4.21A2 2 0 012 14.971V9.029a2 2 0 01.784-1.715L10.25 3.104a1.94 1.94 0 011.5 0z" transform="translate(1, -0.5) scale(1.1)"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21v-8.25M12 3v7.75" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);
