import arrowLeft from "@/assets/icons/Property 1=arrow-left.svg";
import BTC from "@/assets/icons/Property 1=Bitcoin.svg";
import CLP from "@/assets/icons/Property 1=Chile.svg";
import calendar from "@/assets/icons/Property 1=calendar.svg";
import check from "@/assets/icons/Property 1=check.svg";
import chevronDown from "@/assets/icons/Property 1=chevron-down.svg";
import USD from "@/assets/icons/Property 1=dollar-sign.svg";
import eye from "@/assets/icons/Property 1=eye.svg";
import eyeOff from "@/assets/icons/Property 1=eye off.svg";
import filter from "@/assets/icons/Property 1=filter.svg";
import USDT from "@/assets/icons/Property 1=Tether.svg";
import upload from "@/assets/icons/Property 1=upload.svg";
import USDC from "@/assets/icons/Property 1=usdc.svg";
import x from "@/assets/icons/Property 1=x.svg";

export const iconAssetPaths = {
	arrowLeft,
	calendar,
	check,
	chevronDown,
	eyeOff,
	eye,
	filter,
	upload,
	x,
} as const;

export const currencyIcons = {
	BTC,
	CLP,
	USDT,
	USD,
	USDC,
};

export type IconName = keyof typeof iconAssetPaths;
export type CurrencyIconName = keyof typeof currencyIcons;
