import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?:number
}

export const WalletSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 0.5,
    size=24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			className={className}
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M14.058 3.5h-4.11c-1.84 0-3.29 0-4.43.15c-1.17.16-2.12.49-2.87 1.24s-1.08 1.7-1.24 2.87c-.09.67-.13 1.46-.14 2.36c0 .05-.01.09-.01.13v2.06c0 1.83 0 3.29.15 4.43c.16 1.17.49 2.12 1.24 2.87s1.7 1.08 2.87 1.24c1.14.15 2.59.15 4.43.15h4.11c1.84 0 3.29 0 4.43-.15c1.17-.16 2.12-.49 2.87-1.24s1.08-1.7 1.24-2.87c.15-1.14.15-2.6.15-4.43v-2.06c0-.04 0-.08-.01-.13c-.02-.9-.05-1.69-.14-2.36c-.16-1.17-.49-2.12-1.24-2.87s-1.7-1.08-2.87-1.24c-1.14-.15-2.59-.15-4.43-.15m7.16 6c-.02-.59-.05-1.09-.11-1.54c-.14-1.01-.39-1.58-.81-2.01c-.42-.42-1-.67-2.01-.81c-1.03-.14-2.38-.14-4.29-.14h-4c-1.91 0-3.26 0-4.29.14c-1.01.14-1.59.39-2.01.81c-.42.43-.68 1-.81 2.01c-.06.45-.09.95-.11 1.54h3.53c.61 0 1.09 0 1.53.15c.27.1.52.23.75.41c.37.28.64.68.98 1.19l.06.08c.43.64.55.81.69.92c.1.08.22.14.34.18c.17.06.38.07 1.14.07h.39c.77 0 .97-.01 1.14-.07c.12-.04.24-.1.34-.18c.15-.11.27-.28.69-.92l.06-.08c.34-.51.6-.91.98-1.19c.23-.18.48-.31.75-.41c.44-.15.92-.15 1.53-.15zM2.748 11v1.25c0 1.91 0 3.26.14 4.29c.14 1.01.39 1.58.81 2.01c.42.42 1 .67 2.01.81c1.03.14 2.38.14 4.29.14h4c1.91 0 3.26 0 4.29-.14c1.01-.14 1.59-.39 2.01-.81c.42-.43.68-1 .81-2.01c.14-1.03.14-2.38.14-4.29V11h-3.45c-.77 0-.97.01-1.14.07c-.12.04-.24.1-.34.18c-.15.11-.27.28-.69.92l-.06.09c-.34.5-.6.9-.98 1.19c-.23.17-.48.3-.75.4c-.44.15-.92.15-1.53.15h-.61c-.61 0-1.09 0-1.53-.15c-.27-.1-.52-.23-.75-.4c-.37-.29-.64-.69-.98-1.19l-.06-.09c-.43-.64-.55-.81-.69-.92c-.1-.08-.22-.14-.34-.18c-.17-.06-.38-.07-1.14-.07z"
			/>
		</svg>
	);
};


export const HomeSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<g fill="none" color="currentColor">
				<path d="M15 17c-.8.622-1.85 1-3 1s-2.2-.378-3-1" />
				<path d="M2.352 13.214c-.354-2.298-.53-3.446-.096-4.465s1.398-1.715 3.325-3.108L7.021 4.6C9.418 2.867 10.617 2 12.001 2c1.382 0 2.58.867 4.978 2.6l1.44 1.041c1.927 1.393 2.89 2.09 3.325 3.108c.434 1.019.258 2.167-.095 4.464l-.301 1.96c-.5 3.256-.751 4.884-1.919 5.856S16.554 22 13.14 22h-2.28c-3.415 0-5.122 0-6.29-.971c-1.168-.972-1.418-2.6-1.918-5.857z" />
			</g>
		</svg>
	);
};

export const DiscoverSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<g fill="none" color="currentColor">
				<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10" />
				<path d="m12.401 8.298l2.92-.973c.886-.296 1.33-.443 1.564-.21c.233.234.086.677-.21 1.564l-.973 2.92c-.503 1.51-.755 2.265-1.297 2.806c-.541.542-1.296.794-2.806 1.297l-2.92.973c-.887.296-1.33.444-1.564.21s-.086-.678.21-1.564l.973-2.92c.503-1.51.755-2.265 1.297-2.806c.541-.542 1.296-.794 2.806-1.297" />
				<path d="M12 12l-.006.006" />
			</g>
		</svg>
	);
};

export const SettingsSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,

	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<g fill="none" color="currentColor">
				<path d="M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0" />
				<path d="M20.79 9.152C21.598 10.542 22 11.237 22 12s-.403 1.458-1.21 2.848l-1.923 3.316c-.803 1.384-1.205 2.076-1.865 2.456s-1.462.38-3.065.38h-3.874c-1.603 0-2.405 0-3.065-.38s-1.062-1.072-1.865-2.456L3.21 14.848C2.403 13.458 2 12.763 2 12s.403-1.458 1.21-2.848l1.923-3.316C5.936 4.452 6.338 3.76 6.998 3.38S8.46 3 10.063 3h3.874c1.603 0 2.405 0 3.065.38s1.062 1.072 1.865 2.456z" />
			</g>
		</svg>
	);
};
export const UserSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 0.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			className={className}
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7.75 7.5A4.26 4.26 0 0 0 12 11.75a4.26 4.26 0 0 0 4.25-4.25A4.26 4.26 0 0 0 12 3.25A4.26 4.26 0 0 0 7.75 7.5m1.5 0c0-1.52 1.23-2.75 2.75-2.75s2.75 1.23 2.75 2.75s-1.23 2.75-2.75 2.75S9.25 9.02 9.25 7.5m8.5 12.5c0 .41.34.75.75.75s.75-.34.75-.75v-2.03c0-1.65-.81-3.06-2.13-3.66c-3.07-1.38-7.16-1.39-10.24 0c-1.32.6-2.13 2-2.13 3.66V20c0 .41.34.75.75.75s.75-.34.75-.75v-2.03c0-.84.33-1.88 1.25-2.3c2.69-1.21 6.32-1.21 9 0c.92.43 1.25 1.47 1.25 2.3z"
				color="currentColor"
			/>
		</svg>
	);
};
export const UserCircleSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<g fill="none" color="currentColor">
				<path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
				<path d="M14.75 9.5a2.75 2.75 0 1 1-5.5 0a2.75 2.75 0 0 1 5.5 0" />
				<path d="M5.5 19l.56-.98a5 5 0 0 1 4.342-2.52h3.196a5 5 0 0 1 4.342 2.52l.56.98" />
			</g>
		</svg>
	);
};


export const ImageFrameSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<g fill="none" color="currentColor">
				<circle cx={7.5} cy={7.5} r={1.5} />
				<path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
				<path d="M5 21c4.372-5.225 9.274-12.116 16.498-7.458" />
			</g>
		</svg>
	);
};
export const SearchSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<path
				d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0"
				color="currentColor"
			/>
		</svg>
	);
};

export const NewChatSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<path
				d="M12.5 2.012A11 11 0 0 0 12 2C6.478 2 2 6.284 2 11.567c0 2.538 1.033 4.845 2.719 6.556c.371.377.619.892.519 1.422a5.3 5.3 0 0 1-1.087 2.348a6.5 6.5 0 0 0 4.224-.657c.454-.241.681-.362.842-.386s.39.018.848.104c.638.12 1.286.18 1.935.18c5.522 0 10-4.284 10-9.567q0-.286-.017-.567M15 5.5h7M18.5 2v7m-6.504 3h.008m3.987 0H16m-8 0h.009"
				color="currentColor"
			/>
		</svg>
	);
};


export const GlobeSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<circle cx={12} cy={12} r={10} />
			<path d="M8 12c0 6 4 10 4 10s4-4 4-10s-4-10-4-10s-4 4-4 10m13 3H3m18-6H3" />
		</svg>
	);
};

export const ArrowUpSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<path d="M12 4v16m5-11s-3.682-5-5-5s-5 5-5 5" color="currentColor" />
		</svg>
	);
};

export const ReloadSVG: React.FC<IconProps> = ({
	className,
	strokeWidth = 1.5,
	size = 24,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				color="currentColor"
			>
				<path d="M20.5 5.5h-11C5.787 5.5 3 8.185 3 12m.5 6.5h11c3.713 0 6.5-2.685 6.5-6.5" />
				<path d="M18.5 3S21 4.841 21 5.5S18.5 8 18.5 8m-13 8S3 17.841 3 18.5S5.5 21 5.5 21" />
			</g>
		</svg>
	);
};