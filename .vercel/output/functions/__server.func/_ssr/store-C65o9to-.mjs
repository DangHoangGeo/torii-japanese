import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-C65o9to-.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function todayKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function shuffle(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
var HIRAGANA = [
	{
		id: "h-a-あ",
		glyph: "あ",
		romaji: "a",
		script: "hira",
		group: "vowels"
	},
	{
		id: "h-i-い",
		glyph: "い",
		romaji: "i",
		script: "hira",
		group: "vowels"
	},
	{
		id: "h-u-う",
		glyph: "う",
		romaji: "u",
		script: "hira",
		group: "vowels"
	},
	{
		id: "h-e-え",
		glyph: "え",
		romaji: "e",
		script: "hira",
		group: "vowels"
	},
	{
		id: "h-o-お",
		glyph: "お",
		romaji: "o",
		script: "hira",
		group: "vowels"
	},
	{
		id: "h-ka-か",
		glyph: "か",
		romaji: "ka",
		script: "hira",
		group: "k"
	},
	{
		id: "h-ki-き",
		glyph: "き",
		romaji: "ki",
		script: "hira",
		group: "k"
	},
	{
		id: "h-ku-く",
		glyph: "く",
		romaji: "ku",
		script: "hira",
		group: "k"
	},
	{
		id: "h-ke-け",
		glyph: "け",
		romaji: "ke",
		script: "hira",
		group: "k"
	},
	{
		id: "h-ko-こ",
		glyph: "こ",
		romaji: "ko",
		script: "hira",
		group: "k"
	},
	{
		id: "h-sa-さ",
		glyph: "さ",
		romaji: "sa",
		script: "hira",
		group: "s"
	},
	{
		id: "h-shi-し",
		glyph: "し",
		romaji: "shi",
		script: "hira",
		group: "s"
	},
	{
		id: "h-su-す",
		glyph: "す",
		romaji: "su",
		script: "hira",
		group: "s"
	},
	{
		id: "h-se-せ",
		glyph: "せ",
		romaji: "se",
		script: "hira",
		group: "s"
	},
	{
		id: "h-so-そ",
		glyph: "そ",
		romaji: "so",
		script: "hira",
		group: "s"
	},
	{
		id: "h-ta-た",
		glyph: "た",
		romaji: "ta",
		script: "hira",
		group: "t"
	},
	{
		id: "h-chi-ち",
		glyph: "ち",
		romaji: "chi",
		script: "hira",
		group: "t"
	},
	{
		id: "h-tsu-つ",
		glyph: "つ",
		romaji: "tsu",
		script: "hira",
		group: "t"
	},
	{
		id: "h-te-て",
		glyph: "て",
		romaji: "te",
		script: "hira",
		group: "t"
	},
	{
		id: "h-to-と",
		glyph: "と",
		romaji: "to",
		script: "hira",
		group: "t"
	},
	{
		id: "h-na-な",
		glyph: "な",
		romaji: "na",
		script: "hira",
		group: "n"
	},
	{
		id: "h-ni-に",
		glyph: "に",
		romaji: "ni",
		script: "hira",
		group: "n"
	},
	{
		id: "h-nu-ぬ",
		glyph: "ぬ",
		romaji: "nu",
		script: "hira",
		group: "n"
	},
	{
		id: "h-ne-ね",
		glyph: "ね",
		romaji: "ne",
		script: "hira",
		group: "n"
	},
	{
		id: "h-no-の",
		glyph: "の",
		romaji: "no",
		script: "hira",
		group: "n"
	},
	{
		id: "h-ha-は",
		glyph: "は",
		romaji: "ha",
		script: "hira",
		group: "h"
	},
	{
		id: "h-hi-ひ",
		glyph: "ひ",
		romaji: "hi",
		script: "hira",
		group: "h"
	},
	{
		id: "h-fu-ふ",
		glyph: "ふ",
		romaji: "fu",
		script: "hira",
		group: "h"
	},
	{
		id: "h-he-へ",
		glyph: "へ",
		romaji: "he",
		script: "hira",
		group: "h"
	},
	{
		id: "h-ho-ほ",
		glyph: "ほ",
		romaji: "ho",
		script: "hira",
		group: "h"
	},
	{
		id: "h-ma-ま",
		glyph: "ま",
		romaji: "ma",
		script: "hira",
		group: "m"
	},
	{
		id: "h-mi-み",
		glyph: "み",
		romaji: "mi",
		script: "hira",
		group: "m"
	},
	{
		id: "h-mu-む",
		glyph: "む",
		romaji: "mu",
		script: "hira",
		group: "m"
	},
	{
		id: "h-me-め",
		glyph: "め",
		romaji: "me",
		script: "hira",
		group: "m"
	},
	{
		id: "h-mo-も",
		glyph: "も",
		romaji: "mo",
		script: "hira",
		group: "m"
	},
	{
		id: "h-ya-や",
		glyph: "や",
		romaji: "ya",
		script: "hira",
		group: "y"
	},
	{
		id: "h-yu-ゆ",
		glyph: "ゆ",
		romaji: "yu",
		script: "hira",
		group: "y"
	},
	{
		id: "h-yo-よ",
		glyph: "よ",
		romaji: "yo",
		script: "hira",
		group: "y"
	},
	{
		id: "h-ra-ら",
		glyph: "ら",
		romaji: "ra",
		script: "hira",
		group: "r"
	},
	{
		id: "h-ri-り",
		glyph: "り",
		romaji: "ri",
		script: "hira",
		group: "r"
	},
	{
		id: "h-ru-る",
		glyph: "る",
		romaji: "ru",
		script: "hira",
		group: "r"
	},
	{
		id: "h-re-れ",
		glyph: "れ",
		romaji: "re",
		script: "hira",
		group: "r"
	},
	{
		id: "h-ro-ろ",
		glyph: "ろ",
		romaji: "ro",
		script: "hira",
		group: "r"
	},
	{
		id: "h-wa-わ",
		glyph: "わ",
		romaji: "wa",
		script: "hira",
		group: "w"
	},
	{
		id: "h-wo-を",
		glyph: "を",
		romaji: "wo",
		script: "hira",
		group: "w"
	},
	{
		id: "h-n-ん",
		glyph: "ん",
		romaji: "n",
		script: "hira",
		group: "w"
	},
	{
		id: "h-ga-が",
		glyph: "が",
		romaji: "ga",
		script: "hira",
		group: "g"
	},
	{
		id: "h-gi-ぎ",
		glyph: "ぎ",
		romaji: "gi",
		script: "hira",
		group: "g"
	},
	{
		id: "h-gu-ぐ",
		glyph: "ぐ",
		romaji: "gu",
		script: "hira",
		group: "g"
	},
	{
		id: "h-ge-げ",
		glyph: "げ",
		romaji: "ge",
		script: "hira",
		group: "g"
	},
	{
		id: "h-go-ご",
		glyph: "ご",
		romaji: "go",
		script: "hira",
		group: "g"
	},
	{
		id: "h-za-ざ",
		glyph: "ざ",
		romaji: "za",
		script: "hira",
		group: "z"
	},
	{
		id: "h-ji-じ",
		glyph: "じ",
		romaji: "ji",
		script: "hira",
		group: "z"
	},
	{
		id: "h-zu-ず",
		glyph: "ず",
		romaji: "zu",
		script: "hira",
		group: "z"
	},
	{
		id: "h-ze-ぜ",
		glyph: "ぜ",
		romaji: "ze",
		script: "hira",
		group: "z"
	},
	{
		id: "h-zo-ぞ",
		glyph: "ぞ",
		romaji: "zo",
		script: "hira",
		group: "z"
	},
	{
		id: "h-da-だ",
		glyph: "だ",
		romaji: "da",
		script: "hira",
		group: "d"
	},
	{
		id: "h-ji-ぢ",
		glyph: "ぢ",
		romaji: "ji",
		script: "hira",
		group: "d"
	},
	{
		id: "h-zu-づ",
		glyph: "づ",
		romaji: "zu",
		script: "hira",
		group: "d"
	},
	{
		id: "h-de-で",
		glyph: "で",
		romaji: "de",
		script: "hira",
		group: "d"
	},
	{
		id: "h-do-ど",
		glyph: "ど",
		romaji: "do",
		script: "hira",
		group: "d"
	},
	{
		id: "h-ba-ば",
		glyph: "ば",
		romaji: "ba",
		script: "hira",
		group: "b"
	},
	{
		id: "h-bi-び",
		glyph: "び",
		romaji: "bi",
		script: "hira",
		group: "b"
	},
	{
		id: "h-bu-ぶ",
		glyph: "ぶ",
		romaji: "bu",
		script: "hira",
		group: "b"
	},
	{
		id: "h-be-べ",
		glyph: "べ",
		romaji: "be",
		script: "hira",
		group: "b"
	},
	{
		id: "h-bo-ぼ",
		glyph: "ぼ",
		romaji: "bo",
		script: "hira",
		group: "b"
	},
	{
		id: "h-pa-ぱ",
		glyph: "ぱ",
		romaji: "pa",
		script: "hira",
		group: "p"
	},
	{
		id: "h-pi-ぴ",
		glyph: "ぴ",
		romaji: "pi",
		script: "hira",
		group: "p"
	},
	{
		id: "h-pu-ぷ",
		glyph: "ぷ",
		romaji: "pu",
		script: "hira",
		group: "p"
	},
	{
		id: "h-pe-ぺ",
		glyph: "ぺ",
		romaji: "pe",
		script: "hira",
		group: "p"
	},
	{
		id: "h-po-ぽ",
		glyph: "ぽ",
		romaji: "po",
		script: "hira",
		group: "p"
	},
	{
		id: "h-kya-きゃ",
		glyph: "きゃ",
		romaji: "kya",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-kyu-きゅ",
		glyph: "きゅ",
		romaji: "kyu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-kyo-きょ",
		glyph: "きょ",
		romaji: "kyo",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-sha-しゃ",
		glyph: "しゃ",
		romaji: "sha",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-shu-しゅ",
		glyph: "しゅ",
		romaji: "shu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-sho-しょ",
		glyph: "しょ",
		romaji: "sho",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-cha-ちゃ",
		glyph: "ちゃ",
		romaji: "cha",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-chu-ちゅ",
		glyph: "ちゅ",
		romaji: "chu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-cho-ちょ",
		glyph: "ちょ",
		romaji: "cho",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-nya-にゃ",
		glyph: "にゃ",
		romaji: "nya",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-nyu-にゅ",
		glyph: "にゅ",
		romaji: "nyu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-nyo-にょ",
		glyph: "にょ",
		romaji: "nyo",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-hya-ひゃ",
		glyph: "ひゃ",
		romaji: "hya",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-hyu-ひゅ",
		glyph: "ひゅ",
		romaji: "hyu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-hyo-ひょ",
		glyph: "ひょ",
		romaji: "hyo",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-mya-みゃ",
		glyph: "みゃ",
		romaji: "mya",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-myu-みゅ",
		glyph: "みゅ",
		romaji: "myu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-myo-みょ",
		glyph: "みょ",
		romaji: "myo",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-rya-りゃ",
		glyph: "りゃ",
		romaji: "rya",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-ryu-りゅ",
		glyph: "りゅ",
		romaji: "ryu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-ryo-りょ",
		glyph: "りょ",
		romaji: "ryo",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-gya-ぎゃ",
		glyph: "ぎゃ",
		romaji: "gya",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-gyu-ぎゅ",
		glyph: "ぎゅ",
		romaji: "gyu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-gyo-ぎょ",
		glyph: "ぎょ",
		romaji: "gyo",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-ja-じゃ",
		glyph: "じゃ",
		romaji: "ja",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-ju-じゅ",
		glyph: "じゅ",
		romaji: "ju",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-jo-じょ",
		glyph: "じょ",
		romaji: "jo",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-bya-びゃ",
		glyph: "びゃ",
		romaji: "bya",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-byu-びゅ",
		glyph: "びゅ",
		romaji: "byu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-byo-びょ",
		glyph: "びょ",
		romaji: "byo",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-pya-ぴゃ",
		glyph: "ぴゃ",
		romaji: "pya",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-pyu-ぴゅ",
		glyph: "ぴゅ",
		romaji: "pyu",
		script: "hira",
		group: "yoon"
	},
	{
		id: "h-pyo-ぴょ",
		glyph: "ぴょ",
		romaji: "pyo",
		script: "hira",
		group: "yoon"
	}
];
var KATAKANA = [
	{
		id: "k-a-あ",
		glyph: "ア",
		romaji: "a",
		script: "kata",
		group: "vowels"
	},
	{
		id: "k-i-い",
		glyph: "イ",
		romaji: "i",
		script: "kata",
		group: "vowels"
	},
	{
		id: "k-u-う",
		glyph: "ウ",
		romaji: "u",
		script: "kata",
		group: "vowels"
	},
	{
		id: "k-e-え",
		glyph: "エ",
		romaji: "e",
		script: "kata",
		group: "vowels"
	},
	{
		id: "k-o-お",
		glyph: "オ",
		romaji: "o",
		script: "kata",
		group: "vowels"
	},
	{
		id: "k-ka-か",
		glyph: "カ",
		romaji: "ka",
		script: "kata",
		group: "k"
	},
	{
		id: "k-ki-き",
		glyph: "キ",
		romaji: "ki",
		script: "kata",
		group: "k"
	},
	{
		id: "k-ku-く",
		glyph: "ク",
		romaji: "ku",
		script: "kata",
		group: "k"
	},
	{
		id: "k-ke-け",
		glyph: "ケ",
		romaji: "ke",
		script: "kata",
		group: "k"
	},
	{
		id: "k-ko-こ",
		glyph: "コ",
		romaji: "ko",
		script: "kata",
		group: "k"
	},
	{
		id: "k-sa-さ",
		glyph: "サ",
		romaji: "sa",
		script: "kata",
		group: "s"
	},
	{
		id: "k-shi-し",
		glyph: "シ",
		romaji: "shi",
		script: "kata",
		group: "s"
	},
	{
		id: "k-su-す",
		glyph: "ス",
		romaji: "su",
		script: "kata",
		group: "s"
	},
	{
		id: "k-se-せ",
		glyph: "セ",
		romaji: "se",
		script: "kata",
		group: "s"
	},
	{
		id: "k-so-そ",
		glyph: "ソ",
		romaji: "so",
		script: "kata",
		group: "s"
	},
	{
		id: "k-ta-た",
		glyph: "タ",
		romaji: "ta",
		script: "kata",
		group: "t"
	},
	{
		id: "k-chi-ち",
		glyph: "チ",
		romaji: "chi",
		script: "kata",
		group: "t"
	},
	{
		id: "k-tsu-つ",
		glyph: "ツ",
		romaji: "tsu",
		script: "kata",
		group: "t"
	},
	{
		id: "k-te-て",
		glyph: "テ",
		romaji: "te",
		script: "kata",
		group: "t"
	},
	{
		id: "k-to-と",
		glyph: "ト",
		romaji: "to",
		script: "kata",
		group: "t"
	},
	{
		id: "k-na-な",
		glyph: "ナ",
		romaji: "na",
		script: "kata",
		group: "n"
	},
	{
		id: "k-ni-に",
		glyph: "ニ",
		romaji: "ni",
		script: "kata",
		group: "n"
	},
	{
		id: "k-nu-ぬ",
		glyph: "ヌ",
		romaji: "nu",
		script: "kata",
		group: "n"
	},
	{
		id: "k-ne-ね",
		glyph: "ネ",
		romaji: "ne",
		script: "kata",
		group: "n"
	},
	{
		id: "k-no-の",
		glyph: "ノ",
		romaji: "no",
		script: "kata",
		group: "n"
	},
	{
		id: "k-ha-は",
		glyph: "ハ",
		romaji: "ha",
		script: "kata",
		group: "h"
	},
	{
		id: "k-hi-ひ",
		glyph: "ヒ",
		romaji: "hi",
		script: "kata",
		group: "h"
	},
	{
		id: "k-fu-ふ",
		glyph: "フ",
		romaji: "fu",
		script: "kata",
		group: "h"
	},
	{
		id: "k-he-へ",
		glyph: "ヘ",
		romaji: "he",
		script: "kata",
		group: "h"
	},
	{
		id: "k-ho-ほ",
		glyph: "ホ",
		romaji: "ho",
		script: "kata",
		group: "h"
	},
	{
		id: "k-ma-ま",
		glyph: "マ",
		romaji: "ma",
		script: "kata",
		group: "m"
	},
	{
		id: "k-mi-み",
		glyph: "ミ",
		romaji: "mi",
		script: "kata",
		group: "m"
	},
	{
		id: "k-mu-む",
		glyph: "ム",
		romaji: "mu",
		script: "kata",
		group: "m"
	},
	{
		id: "k-me-め",
		glyph: "メ",
		romaji: "me",
		script: "kata",
		group: "m"
	},
	{
		id: "k-mo-も",
		glyph: "モ",
		romaji: "mo",
		script: "kata",
		group: "m"
	},
	{
		id: "k-ya-や",
		glyph: "ヤ",
		romaji: "ya",
		script: "kata",
		group: "y"
	},
	{
		id: "k-yu-ゆ",
		glyph: "ユ",
		romaji: "yu",
		script: "kata",
		group: "y"
	},
	{
		id: "k-yo-よ",
		glyph: "ヨ",
		romaji: "yo",
		script: "kata",
		group: "y"
	},
	{
		id: "k-ra-ら",
		glyph: "ラ",
		romaji: "ra",
		script: "kata",
		group: "r"
	},
	{
		id: "k-ri-り",
		glyph: "リ",
		romaji: "ri",
		script: "kata",
		group: "r"
	},
	{
		id: "k-ru-る",
		glyph: "ル",
		romaji: "ru",
		script: "kata",
		group: "r"
	},
	{
		id: "k-re-れ",
		glyph: "レ",
		romaji: "re",
		script: "kata",
		group: "r"
	},
	{
		id: "k-ro-ろ",
		glyph: "ロ",
		romaji: "ro",
		script: "kata",
		group: "r"
	},
	{
		id: "k-wa-わ",
		glyph: "ワ",
		romaji: "wa",
		script: "kata",
		group: "w"
	},
	{
		id: "k-wo-を",
		glyph: "ヲ",
		romaji: "wo",
		script: "kata",
		group: "w"
	},
	{
		id: "k-n-ん",
		glyph: "ン",
		romaji: "n",
		script: "kata",
		group: "w"
	},
	{
		id: "k-ga-が",
		glyph: "ガ",
		romaji: "ga",
		script: "kata",
		group: "g"
	},
	{
		id: "k-gi-ぎ",
		glyph: "ギ",
		romaji: "gi",
		script: "kata",
		group: "g"
	},
	{
		id: "k-gu-ぐ",
		glyph: "グ",
		romaji: "gu",
		script: "kata",
		group: "g"
	},
	{
		id: "k-ge-げ",
		glyph: "ゲ",
		romaji: "ge",
		script: "kata",
		group: "g"
	},
	{
		id: "k-go-ご",
		glyph: "ゴ",
		romaji: "go",
		script: "kata",
		group: "g"
	},
	{
		id: "k-za-ざ",
		glyph: "ザ",
		romaji: "za",
		script: "kata",
		group: "z"
	},
	{
		id: "k-ji-じ",
		glyph: "ジ",
		romaji: "ji",
		script: "kata",
		group: "z"
	},
	{
		id: "k-zu-ず",
		glyph: "ズ",
		romaji: "zu",
		script: "kata",
		group: "z"
	},
	{
		id: "k-ze-ぜ",
		glyph: "ゼ",
		romaji: "ze",
		script: "kata",
		group: "z"
	},
	{
		id: "k-zo-ぞ",
		glyph: "ゾ",
		romaji: "zo",
		script: "kata",
		group: "z"
	},
	{
		id: "k-da-だ",
		glyph: "ダ",
		romaji: "da",
		script: "kata",
		group: "d"
	},
	{
		id: "k-ji-ぢ",
		glyph: "ヂ",
		romaji: "ji",
		script: "kata",
		group: "d"
	},
	{
		id: "k-zu-づ",
		glyph: "ヅ",
		romaji: "zu",
		script: "kata",
		group: "d"
	},
	{
		id: "k-de-で",
		glyph: "デ",
		romaji: "de",
		script: "kata",
		group: "d"
	},
	{
		id: "k-do-ど",
		glyph: "ド",
		romaji: "do",
		script: "kata",
		group: "d"
	},
	{
		id: "k-ba-ば",
		glyph: "バ",
		romaji: "ba",
		script: "kata",
		group: "b"
	},
	{
		id: "k-bi-び",
		glyph: "ビ",
		romaji: "bi",
		script: "kata",
		group: "b"
	},
	{
		id: "k-bu-ぶ",
		glyph: "ブ",
		romaji: "bu",
		script: "kata",
		group: "b"
	},
	{
		id: "k-be-べ",
		glyph: "ベ",
		romaji: "be",
		script: "kata",
		group: "b"
	},
	{
		id: "k-bo-ぼ",
		glyph: "ボ",
		romaji: "bo",
		script: "kata",
		group: "b"
	},
	{
		id: "k-pa-ぱ",
		glyph: "パ",
		romaji: "pa",
		script: "kata",
		group: "p"
	},
	{
		id: "k-pi-ぴ",
		glyph: "ピ",
		romaji: "pi",
		script: "kata",
		group: "p"
	},
	{
		id: "k-pu-ぷ",
		glyph: "プ",
		romaji: "pu",
		script: "kata",
		group: "p"
	},
	{
		id: "k-pe-ぺ",
		glyph: "ペ",
		romaji: "pe",
		script: "kata",
		group: "p"
	},
	{
		id: "k-po-ぽ",
		glyph: "ポ",
		romaji: "po",
		script: "kata",
		group: "p"
	},
	{
		id: "k-kya-きゃ",
		glyph: "キャ",
		romaji: "kya",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-kyu-きゅ",
		glyph: "キュ",
		romaji: "kyu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-kyo-きょ",
		glyph: "キョ",
		romaji: "kyo",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-sha-しゃ",
		glyph: "シャ",
		romaji: "sha",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-shu-しゅ",
		glyph: "シュ",
		romaji: "shu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-sho-しょ",
		glyph: "ショ",
		romaji: "sho",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-cha-ちゃ",
		glyph: "チャ",
		romaji: "cha",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-chu-ちゅ",
		glyph: "チュ",
		romaji: "chu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-cho-ちょ",
		glyph: "チョ",
		romaji: "cho",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-nya-にゃ",
		glyph: "ニャ",
		romaji: "nya",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-nyu-にゅ",
		glyph: "ニュ",
		romaji: "nyu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-nyo-にょ",
		glyph: "ニョ",
		romaji: "nyo",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-hya-ひゃ",
		glyph: "ヒャ",
		romaji: "hya",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-hyu-ひゅ",
		glyph: "ヒュ",
		romaji: "hyu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-hyo-ひょ",
		glyph: "ヒョ",
		romaji: "hyo",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-mya-みゃ",
		glyph: "ミャ",
		romaji: "mya",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-myu-みゅ",
		glyph: "ミュ",
		romaji: "myu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-myo-みょ",
		glyph: "ミョ",
		romaji: "myo",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-rya-りゃ",
		glyph: "リャ",
		romaji: "rya",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-ryu-りゅ",
		glyph: "リュ",
		romaji: "ryu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-ryo-りょ",
		glyph: "リョ",
		romaji: "ryo",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-gya-ぎゃ",
		glyph: "ギャ",
		romaji: "gya",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-gyu-ぎゅ",
		glyph: "ギュ",
		romaji: "gyu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-gyo-ぎょ",
		glyph: "ギョ",
		romaji: "gyo",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-ja-じゃ",
		glyph: "ジャ",
		romaji: "ja",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-ju-じゅ",
		glyph: "ジュ",
		romaji: "ju",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-jo-じょ",
		glyph: "ジョ",
		romaji: "jo",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-bya-びゃ",
		glyph: "ビャ",
		romaji: "bya",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-byu-びゅ",
		glyph: "ビュ",
		romaji: "byu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-byo-びょ",
		glyph: "ビョ",
		romaji: "byo",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-pya-ぴゃ",
		glyph: "ピャ",
		romaji: "pya",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-pyu-ぴゅ",
		glyph: "ピュ",
		romaji: "pyu",
		script: "kata",
		group: "yoon"
	},
	{
		id: "k-pyo-ぴょ",
		glyph: "ピョ",
		romaji: "pyo",
		script: "kata",
		group: "yoon"
	}
];
var ALL_KANA = [...HIRAGANA, ...KATAKANA];
HIRAGANA.filter((k) => ![
	"g",
	"z",
	"d",
	"b",
	"p",
	"yoon"
].includes(k.group));
KATAKANA.filter((k) => ![
	"g",
	"z",
	"d",
	"b",
	"p",
	"yoon"
].includes(k.group));
var KANJI = [
	{
		id: "kj-日",
		glyph: "日",
		meaning: "day / sun",
		onyomi: "にち・じつ",
		kunyomi: "ひ・か",
		level: "N5",
		example: "今日",
		exampleReading: "きょう",
		exampleMeaning: "today"
	},
	{
		id: "kj-月",
		glyph: "月",
		meaning: "month / moon",
		onyomi: "げつ・がつ",
		kunyomi: "つき",
		level: "N5",
		example: "来月",
		exampleReading: "らいげつ",
		exampleMeaning: "next month"
	},
	{
		id: "kj-火",
		glyph: "火",
		meaning: "fire",
		onyomi: "か",
		kunyomi: "ひ",
		level: "N5",
		example: "火曜日",
		exampleReading: "かようび",
		exampleMeaning: "Tuesday"
	},
	{
		id: "kj-水",
		glyph: "水",
		meaning: "water",
		onyomi: "すい",
		kunyomi: "みず",
		level: "N5",
		example: "水を飲む",
		exampleReading: "みずをのむ",
		exampleMeaning: "drink water"
	},
	{
		id: "kj-木",
		glyph: "木",
		meaning: "tree / wood",
		onyomi: "もく・ぼく",
		kunyomi: "き",
		level: "N5",
		example: "木曜日",
		exampleReading: "もくようび",
		exampleMeaning: "Thursday"
	},
	{
		id: "kj-金",
		glyph: "金",
		meaning: "gold / money",
		onyomi: "きん・こん",
		kunyomi: "かね",
		level: "N5",
		example: "お金",
		exampleReading: "おかね",
		exampleMeaning: "money"
	},
	{
		id: "kj-土",
		glyph: "土",
		meaning: "earth / soil",
		onyomi: "ど・と",
		kunyomi: "つち",
		level: "N5",
		example: "土曜日",
		exampleReading: "どようび",
		exampleMeaning: "Saturday"
	},
	{
		id: "kj-人",
		glyph: "人",
		meaning: "person",
		onyomi: "じん・にん",
		kunyomi: "ひと",
		level: "N5",
		example: "日本人",
		exampleReading: "にほんじん",
		exampleMeaning: "Japanese person"
	},
	{
		id: "kj-山",
		glyph: "山",
		meaning: "mountain",
		onyomi: "さん",
		kunyomi: "やま",
		level: "N5",
		example: "富士山",
		exampleReading: "ふじさん",
		exampleMeaning: "Mt. Fuji"
	},
	{
		id: "kj-川",
		glyph: "川",
		meaning: "river",
		onyomi: "せん",
		kunyomi: "かわ",
		level: "N5",
		example: "川の水",
		exampleReading: "かわのみず",
		exampleMeaning: "river water"
	},
	{
		id: "kj-口",
		glyph: "口",
		meaning: "mouth",
		onyomi: "こう",
		kunyomi: "くち",
		level: "N5",
		example: "入口",
		exampleReading: "いりぐち",
		exampleMeaning: "entrance"
	},
	{
		id: "kj-目",
		glyph: "目",
		meaning: "eye",
		onyomi: "もく",
		kunyomi: "め",
		level: "N5",
		example: "目が見える",
		exampleReading: "めがみえる",
		exampleMeaning: "can see"
	},
	{
		id: "kj-見",
		glyph: "見",
		meaning: "see / look",
		onyomi: "けん",
		kunyomi: "み",
		level: "N5",
		example: "見る",
		exampleReading: "みる",
		exampleMeaning: "to see"
	},
	{
		id: "kj-行",
		glyph: "行",
		meaning: "go",
		onyomi: "こう・ぎょう",
		kunyomi: "い・ゆ",
		level: "N5",
		example: "行く",
		exampleReading: "いく",
		exampleMeaning: "to go"
	},
	{
		id: "kj-来",
		glyph: "来",
		meaning: "come",
		onyomi: "らい",
		kunyomi: "く・き",
		level: "N5",
		example: "来る",
		exampleReading: "くる",
		exampleMeaning: "to come"
	},
	{
		id: "kj-食",
		glyph: "食",
		meaning: "eat",
		onyomi: "しょく",
		kunyomi: "た・く",
		level: "N5",
		example: "食べる",
		exampleReading: "たべる",
		exampleMeaning: "to eat"
	},
	{
		id: "kj-飲",
		glyph: "飲",
		meaning: "drink",
		onyomi: "いん",
		kunyomi: "の",
		level: "N5",
		example: "飲む",
		exampleReading: "のむ",
		exampleMeaning: "to drink"
	},
	{
		id: "kj-学",
		glyph: "学",
		meaning: "study / learn",
		onyomi: "がく",
		kunyomi: "まな",
		level: "N5",
		example: "学校",
		exampleReading: "がっこう",
		exampleMeaning: "school"
	},
	{
		id: "kj-校",
		glyph: "校",
		meaning: "school",
		onyomi: "こう",
		kunyomi: "—",
		level: "N5",
		example: "高校",
		exampleReading: "こうこう",
		exampleMeaning: "high school"
	},
	{
		id: "kj-生",
		glyph: "生",
		meaning: "life / birth",
		onyomi: "せい・しょう",
		kunyomi: "い・う・なま",
		level: "N5",
		example: "学生",
		exampleReading: "がくせい",
		exampleMeaning: "student"
	},
	{
		id: "kj-年",
		glyph: "年",
		meaning: "year",
		onyomi: "ねん",
		kunyomi: "とし",
		level: "N5",
		example: "今年",
		exampleReading: "ことし",
		exampleMeaning: "this year"
	},
	{
		id: "kj-時",
		glyph: "時",
		meaning: "time / hour",
		onyomi: "じ",
		kunyomi: "とき",
		level: "N5",
		example: "時間",
		exampleReading: "じかん",
		exampleMeaning: "time"
	},
	{
		id: "kj-間",
		glyph: "間",
		meaning: "interval / between",
		onyomi: "かん・けん",
		kunyomi: "あいだ・ま",
		level: "N5",
		example: "この間",
		exampleReading: "このあいだ",
		exampleMeaning: "the other day"
	},
	{
		id: "kj-何",
		glyph: "何",
		meaning: "what",
		onyomi: "か",
		kunyomi: "なに・なん",
		level: "N5",
		example: "何ですか",
		exampleReading: "なんですか",
		exampleMeaning: "what is it?"
	},
	{
		id: "kj-大",
		glyph: "大",
		meaning: "big",
		onyomi: "だい・たい",
		kunyomi: "おお",
		level: "N5",
		example: "大きい",
		exampleReading: "おおきい",
		exampleMeaning: "big"
	},
	{
		id: "kj-小",
		glyph: "小",
		meaning: "small",
		onyomi: "しょう",
		kunyomi: "ちい・こ",
		level: "N5",
		example: "小さい",
		exampleReading: "ちいさい",
		exampleMeaning: "small"
	},
	{
		id: "kj-中",
		glyph: "中",
		meaning: "middle / inside",
		onyomi: "ちゅう",
		kunyomi: "なか",
		level: "N5",
		example: "中国",
		exampleReading: "ちゅうごく",
		exampleMeaning: "China"
	},
	{
		id: "kj-上",
		glyph: "上",
		meaning: "up / above",
		onyomi: "じょう",
		kunyomi: "うえ・あ",
		level: "N5",
		example: "上がる",
		exampleReading: "あがる",
		exampleMeaning: "to rise"
	},
	{
		id: "kj-下",
		glyph: "下",
		meaning: "down / below",
		onyomi: "か・げ",
		kunyomi: "した・さ",
		level: "N5",
		example: "下がる",
		exampleReading: "さがる",
		exampleMeaning: "to go down"
	},
	{
		id: "kj-出",
		glyph: "出",
		meaning: "exit / put out",
		onyomi: "しゅつ",
		kunyomi: "で・だ",
		level: "N5",
		example: "出る",
		exampleReading: "でる",
		exampleMeaning: "to leave"
	},
	{
		id: "kj-入",
		glyph: "入",
		meaning: "enter",
		onyomi: "にゅう",
		kunyomi: "はい・い",
		level: "N5",
		example: "入る",
		exampleReading: "はいる",
		exampleMeaning: "to enter"
	},
	{
		id: "kj-語",
		glyph: "語",
		meaning: "language / word",
		onyomi: "ご",
		kunyomi: "かた",
		level: "N5",
		example: "日本語",
		exampleReading: "にほんご",
		exampleMeaning: "Japanese"
	},
	{
		id: "kj-本",
		glyph: "本",
		meaning: "book / origin",
		onyomi: "ほん",
		kunyomi: "もと",
		level: "N5",
		example: "日本",
		exampleReading: "にほん",
		exampleMeaning: "Japan"
	},
	{
		id: "kj-車",
		glyph: "車",
		meaning: "car / vehicle",
		onyomi: "しゃ",
		kunyomi: "くるま",
		level: "N5",
		example: "電車",
		exampleReading: "でんしゃ",
		exampleMeaning: "train"
	},
	{
		id: "kj-電",
		glyph: "電",
		meaning: "electricity",
		onyomi: "でん",
		kunyomi: "—",
		level: "N5",
		example: "電話",
		exampleReading: "でんわ",
		exampleMeaning: "telephone"
	},
	{
		id: "kj-話",
		glyph: "話",
		meaning: "talk / story",
		onyomi: "わ",
		kunyomi: "はなし・はな",
		level: "N5",
		example: "話す",
		exampleReading: "はなす",
		exampleMeaning: "to speak"
	},
	{
		id: "kj-聞",
		glyph: "聞",
		meaning: "hear / ask",
		onyomi: "ぶん・もん",
		kunyomi: "き",
		level: "N5",
		example: "聞く",
		exampleReading: "きく",
		exampleMeaning: "to listen"
	},
	{
		id: "kj-読",
		glyph: "読",
		meaning: "read",
		onyomi: "どく",
		kunyomi: "よ",
		level: "N5",
		example: "読む",
		exampleReading: "よむ",
		exampleMeaning: "to read"
	},
	{
		id: "kj-書",
		glyph: "書",
		meaning: "write",
		onyomi: "しょ",
		kunyomi: "か",
		level: "N5",
		example: "書く",
		exampleReading: "かく",
		exampleMeaning: "to write"
	},
	{
		id: "kj-買",
		glyph: "買",
		meaning: "buy",
		onyomi: "ばい",
		kunyomi: "か",
		level: "N5",
		example: "買う",
		exampleReading: "かう",
		exampleMeaning: "to buy"
	},
	{
		id: "kj-高",
		glyph: "高",
		meaning: "high / expensive",
		onyomi: "こう",
		kunyomi: "たか",
		level: "N5",
		example: "高い",
		exampleReading: "たかい",
		exampleMeaning: "expensive / tall"
	},
	{
		id: "kj-安",
		glyph: "安",
		meaning: "cheap / peaceful",
		onyomi: "あん",
		kunyomi: "やす",
		level: "N5",
		example: "安い",
		exampleReading: "やすい",
		exampleMeaning: "cheap"
	},
	{
		id: "kj-新",
		glyph: "新",
		meaning: "new",
		onyomi: "しん",
		kunyomi: "あたら・あら",
		level: "N5",
		example: "新しい",
		exampleReading: "あたらしい",
		exampleMeaning: "new"
	},
	{
		id: "kj-古",
		glyph: "古",
		meaning: "old",
		onyomi: "こ",
		kunyomi: "ふる",
		level: "N5",
		example: "古い",
		exampleReading: "ふるい",
		exampleMeaning: "old"
	},
	{
		id: "kj-多",
		glyph: "多",
		meaning: "many",
		onyomi: "た",
		kunyomi: "おお",
		level: "N5",
		example: "多い",
		exampleReading: "おおい",
		exampleMeaning: "many"
	},
	{
		id: "kj-少",
		glyph: "少",
		meaning: "few",
		onyomi: "しょう",
		kunyomi: "すく・すこ",
		level: "N5",
		example: "少ない",
		exampleReading: "すくない",
		exampleMeaning: "few"
	},
	{
		id: "kj-今",
		glyph: "今",
		meaning: "now",
		onyomi: "こん",
		kunyomi: "いま",
		level: "N5",
		example: "今日",
		exampleReading: "きょう",
		exampleMeaning: "today"
	},
	{
		id: "kj-先",
		glyph: "先",
		meaning: "ahead / previous",
		onyomi: "せん",
		kunyomi: "さき",
		level: "N5",
		example: "先生",
		exampleReading: "せんせい",
		exampleMeaning: "teacher"
	},
	{
		id: "kj-友",
		glyph: "友",
		meaning: "friend",
		onyomi: "ゆう",
		kunyomi: "とも",
		level: "N5",
		example: "友達",
		exampleReading: "ともだち",
		exampleMeaning: "friend"
	},
	{
		id: "kj-名",
		glyph: "名",
		meaning: "name",
		onyomi: "めい・みょう",
		kunyomi: "な",
		level: "N5",
		example: "名前",
		exampleReading: "なまえ",
		exampleMeaning: "name"
	},
	{
		id: "kj-仕",
		glyph: "仕",
		meaning: "serve / do",
		onyomi: "し",
		kunyomi: "つか",
		level: "N4",
		example: "仕事",
		exampleReading: "しごと",
		exampleMeaning: "job"
	},
	{
		id: "kj-事",
		glyph: "事",
		meaning: "matter / affair",
		onyomi: "じ",
		kunyomi: "こと",
		level: "N4",
		example: "用事",
		exampleReading: "ようじ",
		exampleMeaning: "errand"
	},
	{
		id: "kj-乗",
		glyph: "乗",
		meaning: "ride",
		onyomi: "じょう",
		kunyomi: "の",
		level: "N4",
		example: "乗る",
		exampleReading: "のる",
		exampleMeaning: "to ride"
	},
	{
		id: "kj-場",
		glyph: "場",
		meaning: "place",
		onyomi: "じょう",
		kunyomi: "ば",
		level: "N4",
		example: "場所",
		exampleReading: "ばしょ",
		exampleMeaning: "place"
	},
	{
		id: "kj-開",
		glyph: "開",
		meaning: "open",
		onyomi: "かい",
		kunyomi: "あ・ひら",
		level: "N4",
		example: "開ける",
		exampleReading: "あける",
		exampleMeaning: "to open"
	},
	{
		id: "kj-発",
		glyph: "発",
		meaning: "depart / emit",
		onyomi: "はつ",
		kunyomi: "—",
		level: "N4",
		example: "出発",
		exampleReading: "しゅっぱつ",
		exampleMeaning: "departure"
	},
	{
		id: "kj-使",
		glyph: "使",
		meaning: "use",
		onyomi: "し",
		kunyomi: "つか",
		level: "N4",
		example: "使う",
		exampleReading: "つかう",
		exampleMeaning: "to use"
	},
	{
		id: "kj-作",
		glyph: "作",
		meaning: "make",
		onyomi: "さく",
		kunyomi: "つく",
		level: "N4",
		example: "作る",
		exampleReading: "つくる",
		exampleMeaning: "to make"
	},
	{
		id: "kj-知",
		glyph: "知",
		meaning: "know",
		onyomi: "ち",
		kunyomi: "し",
		level: "N4",
		example: "知る",
		exampleReading: "しる",
		exampleMeaning: "to know"
	},
	{
		id: "kj-思",
		glyph: "思",
		meaning: "think",
		onyomi: "し",
		kunyomi: "おも",
		level: "N4",
		example: "思う",
		exampleReading: "おもう",
		exampleMeaning: "to think"
	},
	{
		id: "kj-考",
		glyph: "考",
		meaning: "consider",
		onyomi: "こう",
		kunyomi: "かんが",
		level: "N4",
		example: "考える",
		exampleReading: "かんがえる",
		exampleMeaning: "to think over"
	},
	{
		id: "kj-始",
		glyph: "始",
		meaning: "begin",
		onyomi: "し",
		kunyomi: "はじ",
		level: "N4",
		example: "始める",
		exampleReading: "はじめる",
		exampleMeaning: "to start"
	},
	{
		id: "kj-終",
		glyph: "終",
		meaning: "end",
		onyomi: "しゅう",
		kunyomi: "お",
		level: "N4",
		example: "終わる",
		exampleReading: "おわる",
		exampleMeaning: "to end"
	},
	{
		id: "kj-持",
		glyph: "持",
		meaning: "hold",
		onyomi: "じ",
		kunyomi: "も",
		level: "N4",
		example: "持つ",
		exampleReading: "もつ",
		exampleMeaning: "to hold"
	},
	{
		id: "kj-待",
		glyph: "待",
		meaning: "wait",
		onyomi: "たい",
		kunyomi: "ま",
		level: "N4",
		example: "待つ",
		exampleReading: "まつ",
		exampleMeaning: "to wait"
	},
	{
		id: "kj-決",
		glyph: "決",
		meaning: "decide",
		onyomi: "けつ",
		kunyomi: "き",
		level: "N3",
		example: "決める",
		exampleReading: "きめる",
		exampleMeaning: "to decide"
	},
	{
		id: "kj-経",
		glyph: "経",
		meaning: "pass / sutra",
		onyomi: "けい・きょう",
		kunyomi: "へ",
		level: "N3",
		example: "経験",
		exampleReading: "けいけん",
		exampleMeaning: "experience"
	},
	{
		id: "kj-験",
		glyph: "験",
		meaning: "test / effect",
		onyomi: "けん",
		kunyomi: "—",
		level: "N3",
		example: "試験",
		exampleReading: "しけん",
		exampleMeaning: "exam"
	},
	{
		id: "kj-確",
		glyph: "確",
		meaning: "certain",
		onyomi: "かく",
		kunyomi: "たし",
		level: "N3",
		example: "確認",
		exampleReading: "かくにん",
		exampleMeaning: "confirmation"
	},
	{
		id: "kj-認",
		glyph: "認",
		meaning: "recognize",
		onyomi: "にん",
		kunyomi: "みと",
		level: "N3",
		example: "認める",
		exampleReading: "みとめる",
		exampleMeaning: "to acknowledge"
	},
	{
		id: "kj-議",
		glyph: "議",
		meaning: "deliberation",
		onyomi: "ぎ",
		kunyomi: "—",
		level: "N3",
		example: "会議",
		exampleReading: "かいぎ",
		exampleMeaning: "meeting"
	},
	{
		id: "kj-変",
		glyph: "変",
		meaning: "change / strange",
		onyomi: "へん",
		kunyomi: "か",
		level: "N3",
		example: "変わる",
		exampleReading: "かわる",
		exampleMeaning: "to change"
	},
	{
		id: "kj-続",
		glyph: "続",
		meaning: "continue",
		onyomi: "ぞく",
		kunyomi: "つづ",
		level: "N3",
		example: "続く",
		exampleReading: "つづく",
		exampleMeaning: "to continue"
	},
	{
		id: "kj-必",
		glyph: "必",
		meaning: "certain / must",
		onyomi: "ひつ",
		kunyomi: "かなら",
		level: "N3",
		example: "必要",
		exampleReading: "ひつよう",
		exampleMeaning: "necessary"
	},
	{
		id: "kj-要",
		glyph: "要",
		meaning: "need",
		onyomi: "よう",
		kunyomi: "い・かなめ",
		level: "N3",
		example: "要する",
		exampleReading: "ようする",
		exampleMeaning: "to require"
	},
	{
		id: "kj-構",
		glyph: "構",
		meaning: "structure / care",
		onyomi: "こう",
		kunyomi: "かま",
		level: "N2",
		example: "結構",
		exampleReading: "けっこう",
		exampleMeaning: "fine / rather"
	},
	{
		id: "kj-態",
		glyph: "態",
		meaning: "condition / form",
		onyomi: "たい",
		kunyomi: "—",
		level: "N2",
		example: "状態",
		exampleReading: "じょうたい",
		exampleMeaning: "state"
	},
	{
		id: "kj-勢",
		glyph: "勢",
		meaning: "force / momentum",
		onyomi: "せい",
		kunyomi: "いきお",
		level: "N2",
		example: "勢い",
		exampleReading: "いきおい",
		exampleMeaning: "momentum"
	},
	{
		id: "kj-従",
		glyph: "従",
		meaning: "obey / follow",
		onyomi: "じゅう",
		kunyomi: "したが",
		level: "N2",
		example: "従う",
		exampleReading: "したがう",
		exampleMeaning: "to follow"
	},
	{
		id: "kj-達",
		glyph: "達",
		meaning: "attain / plural",
		onyomi: "たつ",
		kunyomi: "—",
		level: "N2",
		example: "達成",
		exampleReading: "たっせい",
		exampleMeaning: "achievement"
	},
	{
		id: "kj-成",
		glyph: "成",
		meaning: "become / form",
		onyomi: "せい",
		kunyomi: "な",
		level: "N2",
		example: "成功",
		exampleReading: "せいこう",
		exampleMeaning: "success"
	},
	{
		id: "kj-優",
		glyph: "優",
		meaning: "gentle / superior",
		onyomi: "ゆう",
		kunyomi: "やさ・すぐ",
		level: "N2",
		example: "優先",
		exampleReading: "ゆうせん",
		exampleMeaning: "priority"
	},
	{
		id: "kj-提",
		glyph: "提",
		meaning: "propose / carry",
		onyomi: "てい",
		kunyomi: "さ",
		level: "N2",
		example: "提案",
		exampleReading: "ていあん",
		exampleMeaning: "proposal"
	},
	{
		id: "kj-円",
		glyph: "円",
		meaning: "yen / circle",
		onyomi: "えん",
		kunyomi: "まる",
		level: "N5",
		example: "百円",
		exampleReading: "ひゃくえん",
		exampleMeaning: "100 yen"
	},
	{
		id: "kj-分",
		glyph: "分",
		meaning: "minute / part",
		onyomi: "ふん・ぶん",
		kunyomi: "わ",
		level: "N5",
		example: "五分",
		exampleReading: "ごふん",
		exampleMeaning: "five minutes"
	},
	{
		id: "kj-前",
		glyph: "前",
		meaning: "before / front",
		onyomi: "ぜん",
		kunyomi: "まえ",
		level: "N5",
		example: "名前",
		exampleReading: "なまえ",
		exampleMeaning: "name"
	},
	{
		id: "kj-後",
		glyph: "後",
		meaning: "after / behind",
		onyomi: "ご・こう",
		kunyomi: "あと・うし",
		level: "N5",
		example: "午後",
		exampleReading: "ごご",
		exampleMeaning: "afternoon"
	},
	{
		id: "kj-右",
		glyph: "右",
		meaning: "right",
		onyomi: "う・ゆう",
		kunyomi: "みぎ",
		level: "N5",
		example: "右へ",
		exampleReading: "みぎへ",
		exampleMeaning: "to the right"
	},
	{
		id: "kj-左",
		glyph: "左",
		meaning: "left",
		onyomi: "さ",
		kunyomi: "ひだり",
		level: "N5",
		example: "左へ",
		exampleReading: "ひだりへ",
		exampleMeaning: "to the left"
	},
	{
		id: "kj-東",
		glyph: "東",
		meaning: "east",
		onyomi: "とう",
		kunyomi: "ひがし",
		level: "N5",
		example: "東京",
		exampleReading: "とうきょう",
		exampleMeaning: "Tokyo"
	},
	{
		id: "kj-西",
		glyph: "西",
		meaning: "west",
		onyomi: "せい・さい",
		kunyomi: "にし",
		level: "N5",
		example: "西口",
		exampleReading: "にしぐち",
		exampleMeaning: "west exit"
	},
	{
		id: "kj-南",
		glyph: "南",
		meaning: "south",
		onyomi: "なん",
		kunyomi: "みなみ",
		level: "N5",
		example: "南口",
		exampleReading: "みなみぐち",
		exampleMeaning: "south exit"
	},
	{
		id: "kj-北",
		glyph: "北",
		meaning: "north",
		onyomi: "ほく",
		kunyomi: "きた",
		level: "N5",
		example: "北海道",
		exampleReading: "ほっかいどう",
		exampleMeaning: "Hokkaido"
	},
	{
		id: "kj-外",
		glyph: "外",
		meaning: "outside",
		onyomi: "がい",
		kunyomi: "そと・はず",
		level: "N5",
		example: "外国",
		exampleReading: "がいこく",
		exampleMeaning: "foreign country"
	},
	{
		id: "kj-国",
		glyph: "国",
		meaning: "country",
		onyomi: "こく",
		kunyomi: "くに",
		level: "N5",
		example: "中国",
		exampleReading: "ちゅうごく",
		exampleMeaning: "China"
	},
	{
		id: "kj-雨",
		glyph: "雨",
		meaning: "rain",
		onyomi: "う",
		kunyomi: "あめ",
		level: "N5",
		example: "雨が降る",
		exampleReading: "あめがふる",
		exampleMeaning: "it rains"
	},
	{
		id: "kj-天",
		glyph: "天",
		meaning: "heaven / sky",
		onyomi: "てん",
		kunyomi: "あま",
		level: "N5",
		example: "天気",
		exampleReading: "てんき",
		exampleMeaning: "weather"
	},
	{
		id: "kj-気",
		glyph: "気",
		meaning: "spirit / mood",
		onyomi: "き・け",
		kunyomi: "—",
		level: "N5",
		example: "元気",
		exampleReading: "げんき",
		exampleMeaning: "healthy / well"
	},
	{
		id: "kj-休",
		glyph: "休",
		meaning: "rest",
		onyomi: "きゅう",
		kunyomi: "やす",
		level: "N5",
		example: "休む",
		exampleReading: "やすむ",
		exampleMeaning: "to rest"
	},
	{
		id: "kj-毎",
		glyph: "毎",
		meaning: "every",
		onyomi: "まい",
		kunyomi: "—",
		level: "N5",
		example: "毎日",
		exampleReading: "まいにち",
		exampleMeaning: "every day"
	},
	{
		id: "kj-週",
		glyph: "週",
		meaning: "week",
		onyomi: "しゅう",
		kunyomi: "—",
		level: "N5",
		example: "来週",
		exampleReading: "らいしゅう",
		exampleMeaning: "next week"
	},
	{
		id: "kj-曜",
		glyph: "曜",
		meaning: "day of week",
		onyomi: "よう",
		kunyomi: "—",
		level: "N5",
		example: "月曜日",
		exampleReading: "げつようび",
		exampleMeaning: "Monday"
	},
	{
		id: "kj-父",
		glyph: "父",
		meaning: "father",
		onyomi: "ふ",
		kunyomi: "ちち",
		level: "N5",
		example: "お父さん",
		exampleReading: "おとうさん",
		exampleMeaning: "father"
	},
	{
		id: "kj-母",
		glyph: "母",
		meaning: "mother",
		onyomi: "ぼ",
		kunyomi: "はは",
		level: "N5",
		example: "お母さん",
		exampleReading: "おかあさん",
		exampleMeaning: "mother"
	},
	{
		id: "kj-男",
		glyph: "男",
		meaning: "man",
		onyomi: "だん・なん",
		kunyomi: "おとこ",
		level: "N5",
		example: "男の人",
		exampleReading: "おとこのひと",
		exampleMeaning: "man"
	},
	{
		id: "kj-女",
		glyph: "女",
		meaning: "woman",
		onyomi: "じょ・にょ",
		kunyomi: "おんな",
		level: "N5",
		example: "女の人",
		exampleReading: "おんなのひと",
		exampleMeaning: "woman"
	},
	{
		id: "kj-子",
		glyph: "子",
		meaning: "child",
		onyomi: "し・す",
		kunyomi: "こ",
		level: "N5",
		example: "子供",
		exampleReading: "こども",
		exampleMeaning: "child"
	},
	{
		id: "kj-社",
		glyph: "社",
		meaning: "company / shrine",
		onyomi: "しゃ",
		kunyomi: "やしろ",
		level: "N4",
		example: "会社",
		exampleReading: "かいしゃ",
		exampleMeaning: "company"
	},
	{
		id: "kj-会",
		glyph: "会",
		meaning: "meet / association",
		onyomi: "かい",
		kunyomi: "あ",
		level: "N4",
		example: "会議",
		exampleReading: "かいぎ",
		exampleMeaning: "meeting"
	},
	{
		id: "kj-駅",
		glyph: "駅",
		meaning: "station",
		onyomi: "えき",
		kunyomi: "—",
		level: "N5",
		example: "東京駅",
		exampleReading: "とうきょうえき",
		exampleMeaning: "Tokyo Station"
	},
	{
		id: "kj-店",
		glyph: "店",
		meaning: "shop",
		onyomi: "てん",
		kunyomi: "みせ",
		level: "N4",
		example: "店員",
		exampleReading: "てんいん",
		exampleMeaning: "shop clerk"
	},
	{
		id: "kj-問",
		glyph: "問",
		meaning: "question",
		onyomi: "もん",
		kunyomi: "と",
		level: "N4",
		example: "問題",
		exampleReading: "もんだい",
		exampleMeaning: "problem / question"
	},
	{
		id: "kj-題",
		glyph: "題",
		meaning: "topic / title",
		onyomi: "だい",
		kunyomi: "—",
		level: "N4",
		example: "問題",
		exampleReading: "もんだい",
		exampleMeaning: "problem"
	},
	{
		id: "kj-意",
		glyph: "意",
		meaning: "mind / meaning",
		onyomi: "い",
		kunyomi: "—",
		level: "N3",
		example: "意味",
		exampleReading: "いみ",
		exampleMeaning: "meaning"
	},
	{
		id: "kj-味",
		glyph: "味",
		meaning: "taste / flavor",
		onyomi: "み",
		kunyomi: "あじ",
		level: "N4",
		example: "意味",
		exampleReading: "いみ",
		exampleMeaning: "meaning"
	},
	{
		id: "kj-調",
		glyph: "調",
		meaning: "investigate / tone",
		onyomi: "ちょう",
		kunyomi: "しら",
		level: "N3",
		example: "調査",
		exampleReading: "ちょうさ",
		exampleMeaning: "survey"
	},
	{
		id: "kj-査",
		glyph: "査",
		meaning: "inspect",
		onyomi: "さ",
		kunyomi: "—",
		level: "N3",
		example: "調査",
		exampleReading: "ちょうさ",
		exampleMeaning: "investigation"
	},
	{
		id: "kj-報",
		glyph: "報",
		meaning: "report / reward",
		onyomi: "ほう",
		kunyomi: "むく",
		level: "N3",
		example: "情報",
		exampleReading: "じょうほう",
		exampleMeaning: "information"
	},
	{
		id: "kj-情",
		glyph: "情",
		meaning: "feeling / facts",
		onyomi: "じょう",
		kunyomi: "なさ",
		level: "N3",
		example: "情報",
		exampleReading: "じょうほう",
		exampleMeaning: "information"
	},
	{
		id: "kj-対",
		glyph: "対",
		meaning: "versus / opposite",
		onyomi: "たい",
		kunyomi: "—",
		level: "N2",
		example: "対策",
		exampleReading: "たいさく",
		exampleMeaning: "countermeasure"
	},
	{
		id: "kj-策",
		glyph: "策",
		meaning: "plan / measure",
		onyomi: "さく",
		kunyomi: "—",
		level: "N2",
		example: "政策",
		exampleReading: "せいさく",
		exampleMeaning: "policy"
	},
	{
		id: "kj-果",
		glyph: "果",
		meaning: "fruit / result",
		onyomi: "か",
		kunyomi: "は",
		level: "N3",
		example: "結果",
		exampleReading: "けっか",
		exampleMeaning: "result"
	},
	{
		id: "kj-責",
		glyph: "責",
		meaning: "responsibility",
		onyomi: "せき",
		kunyomi: "せ",
		level: "N2",
		example: "責任",
		exampleReading: "せきにん",
		exampleMeaning: "responsibility"
	}
];
var VOCAB = [
	{
		id: "v-こんにちは",
		jp: "こんにちは",
		reading: "こんにちは",
		meaning: "hello (daytime)",
		level: "N5",
		pos: "phrase"
	},
	{
		id: "v-ありがとう",
		jp: "ありがとう",
		reading: "ありがとう",
		meaning: "thank you",
		level: "N5",
		pos: "phrase"
	},
	{
		id: "v-すみません",
		jp: "すみません",
		reading: "すみません",
		meaning: "excuse me / sorry",
		level: "N5",
		pos: "phrase"
	},
	{
		id: "v-お願いします",
		jp: "お願いします",
		reading: "おねがいします",
		meaning: "please (request)",
		level: "N5",
		pos: "phrase"
	},
	{
		id: "v-食べる",
		jp: "食べる",
		reading: "たべる",
		meaning: "to eat",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-飲む",
		jp: "飲む",
		reading: "のむ",
		meaning: "to drink",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-行く",
		jp: "行く",
		reading: "いく",
		meaning: "to go",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-来る",
		jp: "来る",
		reading: "くる",
		meaning: "to come",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-帰る",
		jp: "帰る",
		reading: "かえる",
		meaning: "to return home",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-見る",
		jp: "見る",
		reading: "みる",
		meaning: "to see / watch",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-聞く",
		jp: "聞く",
		reading: "きく",
		meaning: "to listen / ask",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-読む",
		jp: "読む",
		reading: "よむ",
		meaning: "to read",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-書く",
		jp: "書く",
		reading: "かく",
		meaning: "to write",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-話す",
		jp: "話す",
		reading: "はなす",
		meaning: "to speak",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-買う",
		jp: "買う",
		reading: "かう",
		meaning: "to buy",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-待つ",
		jp: "待つ",
		reading: "まつ",
		meaning: "to wait",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-する",
		jp: "する",
		reading: "する",
		meaning: "to do",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-いる",
		jp: "いる",
		reading: "いる",
		meaning: "to exist (animate)",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-ある",
		jp: "ある",
		reading: "ある",
		meaning: "to exist (inanimate)",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-大きい",
		jp: "大きい",
		reading: "おおきい",
		meaning: "big",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-小さい",
		jp: "小さい",
		reading: "ちいさい",
		meaning: "small",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-新しい",
		jp: "新しい",
		reading: "あたらしい",
		meaning: "new",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-古い",
		jp: "古い",
		reading: "ふるい",
		meaning: "old (not age)",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-高い",
		jp: "高い",
		reading: "たかい",
		meaning: "expensive / tall",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-安い",
		jp: "安い",
		reading: "やすい",
		meaning: "cheap",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-多い",
		jp: "多い",
		reading: "おおい",
		meaning: "many",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-少ない",
		jp: "少ない",
		reading: "すくない",
		meaning: "few",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-難しい",
		jp: "難しい",
		reading: "むずかしい",
		meaning: "difficult",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-易しい",
		jp: "易しい",
		reading: "やさしい",
		meaning: "easy",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-好き",
		jp: "好き",
		reading: "すき",
		meaning: "liked",
		level: "N5",
		pos: "na-adj"
	},
	{
		id: "v-今日",
		jp: "今日",
		reading: "きょう",
		meaning: "today",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-明日",
		jp: "明日",
		reading: "あした",
		meaning: "tomorrow",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-昨日",
		jp: "昨日",
		reading: "きのう",
		meaning: "yesterday",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-朝",
		jp: "朝",
		reading: "あさ",
		meaning: "morning",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-夜",
		jp: "夜",
		reading: "よる",
		meaning: "night",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-友達",
		jp: "友達",
		reading: "ともだち",
		meaning: "friend",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-先生",
		jp: "先生",
		reading: "せんせい",
		meaning: "teacher",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-学生",
		jp: "学生",
		reading: "がくせい",
		meaning: "student",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-電車",
		jp: "電車",
		reading: "でんしゃ",
		meaning: "train",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-駅",
		jp: "駅",
		reading: "えき",
		meaning: "station",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-仕事",
		jp: "仕事",
		reading: "しごと",
		meaning: "work / job",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-経験",
		jp: "経験",
		reading: "けいけん",
		meaning: "experience",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-準備",
		jp: "準備",
		reading: "じゅんび",
		meaning: "preparation",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-都合",
		jp: "都合",
		reading: "つごう",
		meaning: "convenience / circumstances",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-連絡",
		jp: "連絡",
		reading: "れんらく",
		meaning: "contact",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-予約",
		jp: "予約",
		reading: "よやく",
		meaning: "reservation",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-約束",
		jp: "約束",
		reading: "やくそく",
		meaning: "promise",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-案内",
		jp: "案内",
		reading: "あんない",
		meaning: "guidance",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-説明",
		jp: "説明",
		reading: "せつめい",
		meaning: "explanation",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-必要",
		jp: "必要",
		reading: "ひつよう",
		meaning: "necessary",
		level: "N4",
		pos: "na-adj"
	},
	{
		id: "v-十分",
		jp: "十分",
		reading: "じゅうぶん",
		meaning: "enough",
		level: "N4",
		pos: "na-adj"
	},
	{
		id: "v-続ける",
		jp: "続ける",
		reading: "つづける",
		meaning: "to continue",
		level: "N4",
		pos: "verb"
	},
	{
		id: "v-始める",
		jp: "始める",
		reading: "はじめる",
		meaning: "to begin",
		level: "N4",
		pos: "verb"
	},
	{
		id: "v-終わる",
		jp: "終わる",
		reading: "おわる",
		meaning: "to end",
		level: "N4",
		pos: "verb"
	},
	{
		id: "v-決める",
		jp: "決める",
		reading: "きめる",
		meaning: "to decide",
		level: "N4",
		pos: "verb"
	},
	{
		id: "v-確認",
		jp: "確認",
		reading: "かくにん",
		meaning: "confirmation",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-検討",
		jp: "検討",
		reading: "けんとう",
		meaning: "consideration / review",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-影響",
		jp: "影響",
		reading: "えいきょう",
		meaning: "influence / effect",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-状況",
		jp: "状況",
		reading: "じょうきょう",
		meaning: "situation",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-関係",
		jp: "関係",
		reading: "かんけい",
		meaning: "relationship",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-意味",
		jp: "意味",
		reading: "いみ",
		meaning: "meaning",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-理由",
		jp: "理由",
		reading: "りゆう",
		meaning: "reason",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-方法",
		jp: "方法",
		reading: "ほうほう",
		meaning: "method",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-機会",
		jp: "機会",
		reading: "きかい",
		meaning: "opportunity",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-結果",
		jp: "結果",
		reading: "けっか",
		meaning: "result",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-増える",
		jp: "増える",
		reading: "ふえる",
		meaning: "to increase",
		level: "N3",
		pos: "verb"
	},
	{
		id: "v-減る",
		jp: "減る",
		reading: "へる",
		meaning: "to decrease",
		level: "N3",
		pos: "verb"
	},
	{
		id: "v-優先",
		jp: "優先",
		reading: "ゆうせん",
		meaning: "priority",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-提案",
		jp: "提案",
		reading: "ていあん",
		meaning: "proposal",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-達成",
		jp: "達成",
		reading: "たっせい",
		meaning: "achievement",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-継続",
		jp: "継続",
		reading: "けいぞく",
		meaning: "continuation",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-改善",
		jp: "改善",
		reading: "かいぜん",
		meaning: "improvement",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-効率",
		jp: "効率",
		reading: "こうりつ",
		meaning: "efficiency",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-傾向",
		jp: "傾向",
		reading: "けいこう",
		meaning: "tendency",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-役割",
		jp: "役割",
		reading: "やくわり",
		meaning: "role",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-意識",
		jp: "意識",
		reading: "いしき",
		meaning: "awareness",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-判断",
		jp: "判断",
		reading: "はんだん",
		meaning: "judgment",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-前提",
		jp: "前提",
		reading: "ぜんてい",
		meaning: "premise",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-具体的",
		jp: "具体的",
		reading: "ぐたいてき",
		meaning: "concrete / specific",
		level: "N2",
		pos: "na-adj"
	},
	{
		id: "v-抽象的",
		jp: "抽象的",
		reading: "ちゅうしょうてき",
		meaning: "abstract",
		level: "N2",
		pos: "na-adj"
	},
	{
		id: "v-水",
		jp: "水",
		reading: "みず",
		meaning: "water",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-お茶",
		jp: "お茶",
		reading: "おちゃ",
		meaning: "tea",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-ご飯",
		jp: "ご飯",
		reading: "ごはん",
		meaning: "cooked rice / a meal",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-映画",
		jp: "映画",
		reading: "えいが",
		meaning: "movie",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-音楽",
		jp: "音楽",
		reading: "おんがく",
		meaning: "music",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-天気",
		jp: "天気",
		reading: "てんき",
		meaning: "weather",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-雨",
		jp: "雨",
		reading: "あめ",
		meaning: "rain",
		level: "N5",
		pos: "noun"
	},
	{
		id: "v-暑い",
		jp: "暑い",
		reading: "あつい",
		meaning: "hot (weather)",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-寒い",
		jp: "寒い",
		reading: "さむい",
		meaning: "cold (weather)",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-忙しい",
		jp: "忙しい",
		reading: "いそがしい",
		meaning: "busy",
		level: "N5",
		pos: "i-adj"
	},
	{
		id: "v-分かる",
		jp: "分かる",
		reading: "わかる",
		meaning: "to understand",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-教える",
		jp: "教える",
		reading: "おしえる",
		meaning: "to teach",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-覚える",
		jp: "覚える",
		reading: "おぼえる",
		meaning: "to memorize",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-働く",
		jp: "働く",
		reading: "はたらく",
		meaning: "to work",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-休む",
		jp: "休む",
		reading: "やすむ",
		meaning: "to rest / be absent",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-使う",
		jp: "使う",
		reading: "つかう",
		meaning: "to use",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-作る",
		jp: "作る",
		reading: "つくる",
		meaning: "to make",
		level: "N5",
		pos: "verb"
	},
	{
		id: "v-返事",
		jp: "返事",
		reading: "へんじ",
		meaning: "reply",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-相談",
		jp: "相談",
		reading: "そうだん",
		meaning: "consultation",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-意見",
		jp: "意見",
		reading: "いけん",
		meaning: "opinion",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-成功",
		jp: "成功",
		reading: "せいこう",
		meaning: "success",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-失敗",
		jp: "失敗",
		reading: "しっぱい",
		meaning: "failure",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-参加",
		jp: "参加",
		reading: "さんか",
		meaning: "participation",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-注意",
		jp: "注意",
		reading: "ちゅうい",
		meaning: "caution / attention",
		level: "N4",
		pos: "noun"
	},
	{
		id: "v-安全",
		jp: "安全",
		reading: "あんぜん",
		meaning: "safety",
		level: "N4",
		pos: "na-adj"
	},
	{
		id: "v-普通",
		jp: "普通",
		reading: "ふつう",
		meaning: "ordinary / usually",
		level: "N4",
		pos: "na-adj"
	},
	{
		id: "v-責任",
		jp: "責任",
		reading: "せきにん",
		meaning: "responsibility",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-目標",
		jp: "目標",
		reading: "もくひょう",
		meaning: "goal / target",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-課題",
		jp: "課題",
		reading: "かだい",
		meaning: "task / issue",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-環境",
		jp: "環境",
		reading: "かんきょう",
		meaning: "environment",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-社会",
		jp: "社会",
		reading: "しゃかい",
		meaning: "society",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-情報",
		jp: "情報",
		reading: "じょうほう",
		meaning: "information",
		level: "N3",
		pos: "noun"
	},
	{
		id: "v-議論",
		jp: "議論",
		reading: "ぎろん",
		meaning: "debate / discussion",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-主張",
		jp: "主張",
		reading: "しゅちょう",
		meaning: "assertion / claim",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-指摘",
		jp: "指摘",
		reading: "してき",
		meaning: "pointing out",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-対策",
		jp: "対策",
		reading: "たいさく",
		meaning: "countermeasure",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-貢献",
		jp: "貢献",
		reading: "こうけん",
		meaning: "contribution",
		level: "N2",
		pos: "noun"
	},
	{
		id: "v-把握",
		jp: "把握",
		reading: "はあく",
		meaning: "grasp / understanding",
		level: "N2",
		pos: "noun"
	}
];
var GRAMMAR = [
	{
		id: "g-desu",
		pattern: "〜です / 〜ます",
		meaning: "polite present",
		level: "N5",
		example: "学生です。",
		exampleReading: "がくせいです。",
		exampleMeaning: "I am a student.",
		tip: "です attaches to nouns and na-adjectives. ます is the polite verb ending."
	},
	{
		id: "g-wa-ga",
		pattern: "は / が",
		meaning: "topic vs subject",
		level: "N5",
		example: "私は学生です。",
		exampleReading: "わたしはがくせいです。",
		exampleMeaning: "As for me, I am a student.",
		tip: "は marks the topic. が marks the grammatical subject or new information."
	},
	{
		id: "g-wo",
		pattern: "を",
		meaning: "direct object",
		level: "N5",
		example: "本を読む。",
		exampleReading: "ほんをよむ。",
		exampleMeaning: "Read a book.",
		tip: "を marks what the verb acts on."
	},
	{
		id: "g-ni-de",
		pattern: "に / で",
		meaning: "destination vs place of action",
		level: "N5",
		example: "学校で勉強する。",
		exampleReading: "がっこうでべんきょうする。",
		exampleMeaning: "Study at school.",
		tip: "に often marks time or destination. で marks where an action happens, or the means."
	},
	{
		id: "g-he",
		pattern: "へ",
		meaning: "direction",
		level: "N5",
		example: "日本へ行く。",
		exampleReading: "にほんへいく。",
		exampleMeaning: "Go to Japan.",
		tip: "へ emphasizes direction; に emphasizes arrival point."
	},
	{
		id: "g-no",
		pattern: "の",
		meaning: "possession / noun modifier",
		level: "N5",
		example: "私の本。",
		exampleReading: "わたしのほん。",
		exampleMeaning: "My book.",
		tip: "Links two nouns. The first modifies the second."
	},
	{
		id: "g-tai",
		pattern: "〜たい",
		meaning: "want to do",
		level: "N5",
		example: "日本へ行きたい。",
		exampleReading: "にほんへいきたい。",
		exampleMeaning: "I want to go to Japan.",
		tip: "Attach たい to the ます-stem. Conjugates like an i-adjective."
	},
	{
		id: "g-nai",
		pattern: "〜ない",
		meaning: "plain negative",
		level: "N5",
		example: "行かない。",
		exampleReading: "いかない。",
		exampleMeaning: "I don't / won't go.",
		tip: "Group 1: final -u becomes -a + ない. Group 2: drop る."
	},
	{
		id: "g-te",
		pattern: "て-form",
		meaning: "linking, request, progressive base",
		level: "N5",
		example: "食べてください。",
		exampleReading: "たべてください。",
		exampleMeaning: "Please eat.",
		tip: "The most useful verb form after ます. Learn the sound-change groups thoroughly."
	},
	{
		id: "g-ta",
		pattern: "た-form",
		meaning: "plain past",
		level: "N5",
		example: "昨日行った。",
		exampleReading: "きのういった。",
		exampleMeaning: "I went yesterday.",
		tip: "Built from て-form: て→た, で→だ."
	},
	{
		id: "g-teiru",
		pattern: "〜ている",
		meaning: "progressive or resulting state",
		level: "N5",
		example: "今、勉強している。",
		exampleReading: "いま、べんきょうしている。",
		exampleMeaning: "I am studying now.",
		tip: "Ongoing action, or a state that resulted (知っている = know)."
	},
	{
		id: "g-kara-node",
		pattern: "から / ので",
		meaning: "because",
		level: "N5",
		example: "寒いから、コートを着ます。",
		exampleReading: "さむいから、コートをきます。",
		exampleMeaning: "Because it's cold, I'll wear a coat.",
		tip: "ので is softer and more formal than から."
	},
	{
		id: "g-to",
		pattern: "と",
		meaning: "and / with / quotation",
		level: "N5",
		example: "友達と話す。",
		exampleReading: "ともだちとはなす。",
		exampleMeaning: "Talk with a friend.",
		tip: "Complete-list 'and', companion, or quote marker."
	},
	{
		id: "g-mo",
		pattern: "も",
		meaning: "also / even",
		level: "N5",
		example: "私も学生です。",
		exampleReading: "わたしもがくせいです。",
		exampleMeaning: "I am also a student.",
		tip: "Replaces は/が/を when adding another item to a set."
	},
	{
		id: "g-tara",
		pattern: "〜たら",
		meaning: "when / if (after that)",
		level: "N4",
		example: "着いたら電話して。",
		exampleReading: "ついたらでんわして。",
		exampleMeaning: "Call when you arrive.",
		tip: "Past form + ら. Condition or sequence."
	},
	{
		id: "g-ba",
		pattern: "〜ば",
		meaning: "if (conditional)",
		level: "N4",
		example: "時間があれば行きます。",
		exampleReading: "じかんがあればいきます。",
		exampleMeaning: "I'll go if I have time.",
		tip: "More hypothetical than たら. Verb: e-stem + ば."
	},
	{
		id: "g-nakereba",
		pattern: "〜なければならない",
		meaning: "must",
		level: "N4",
		example: "宿題をしなければならない。",
		exampleReading: "しゅくだいをしなければならない。",
		exampleMeaning: "I must do homework.",
		tip: "Negative stem + なければならない. Formal obligation."
	},
	{
		id: "g-nagara",
		pattern: "〜ながら",
		meaning: "while doing",
		level: "N4",
		example: "音楽を聞きながら勉強する。",
		exampleReading: "おんがくをききながらべんきょうする。",
		exampleMeaning: "Study while listening to music.",
		tip: "Same subject, two simultaneous actions. Main action last."
	},
	{
		id: "g-souda",
		pattern: "〜そうだ",
		meaning: "looks like / hearsay",
		level: "N4",
		example: "雨が降りそうだ。",
		exampleReading: "あめがふりそうだ。",
		exampleMeaning: "It looks like rain.",
		tip: "Stem + そう = appearance. Plain form + そう = hearsay."
	},
	{
		id: "g-te-shimau",
		pattern: "〜てしまう",
		meaning: "finish / regrettably do",
		level: "N4",
		example: "宿題を忘れてしまった。",
		exampleReading: "しゅくだいをわすれてしまった。",
		exampleMeaning: "I (unfortunately) forgot the homework.",
		tip: "Completion, or an unintended/regrettable outcome. Casual: ちゃう / じゃう."
	},
	{
		id: "g-youni",
		pattern: "〜ようにする",
		meaning: "make an effort to",
		level: "N3",
		example: "毎日運動するようにしている。",
		exampleReading: "まいにちうんどうするようにしている。",
		exampleMeaning: "I make a point of exercising every day.",
		tip: "Volitional effort toward a habit or goal."
	},
	{
		id: "g-koto-ni",
		pattern: "〜ことにする",
		meaning: "decide to",
		level: "N3",
		example: "禁煙することにした。",
		exampleReading: "きんえんすることにした。",
		exampleMeaning: "I decided to quit smoking.",
		tip: "Speaker's decision. ことになる is an external outcome."
	},
	{
		id: "g-wake",
		pattern: "〜わけではない",
		meaning: "it doesn't mean that",
		level: "N3",
		example: "行きたくないわけではない。",
		exampleReading: "いきたくないわけではない。",
		exampleMeaning: "It's not that I don't want to go.",
		tip: "Softens or corrects an inference."
	},
	{
		id: "g-bakari",
		pattern: "〜ばかり",
		meaning: "nothing but / just now",
		level: "N3",
		example: "甘いものばかり食べる。",
		exampleReading: "あまいものばかりたべる。",
		exampleMeaning: "I eat nothing but sweets.",
		tip: "Excessive repetition, or たばかり = just did."
	},
	{
		id: "g-nitsurete",
		pattern: "〜につれて",
		meaning: "as / in proportion to",
		level: "N2",
		example: "成長するにつれて考えが変わる。",
		exampleReading: "せいちょうするにつれてかんがえがかわる。",
		exampleMeaning: "As one grows, thinking changes.",
		tip: "Two changes progress together."
	},
	{
		id: "g-wake-ni",
		pattern: "〜わけにはいかない",
		meaning: "cannot very well",
		level: "N2",
		example: "約束を破るわけにはいかない。",
		exampleReading: "やくそくをやぶるわけにはいかない。",
		exampleMeaning: "I can't very well break a promise.",
		tip: "Social or moral constraint, not pure ability."
	},
	{
		id: "g-kanenai",
		pattern: "〜かねない",
		meaning: "might (undesirable)",
		level: "N2",
		example: "事故になりかねない。",
		exampleReading: "じこになりかねない。",
		exampleMeaning: "It might well lead to an accident.",
		tip: "Warns of a negative possibility. Stem + かねない."
	},
	{
		id: "g-toshitara",
		pattern: "〜としたら",
		meaning: "if we assume",
		level: "N2",
		example: "彼が来ないとしたらどうする？",
		exampleReading: "かれがこないとしたらどうする？",
		exampleMeaning: "If he doesn't come, what do we do?",
		tip: "Hypothetical assumption for discussion."
	},
	{
		id: "g-ni-totte",
		pattern: "〜にとって",
		meaning: "for / from the standpoint of",
		level: "N2",
		example: "私にとって日本語は大切だ。",
		exampleReading: "わたしにとってにほんごはたいせつだ。",
		exampleMeaning: "Japanese is important to me.",
		tip: "Evaluates something from a person's viewpoint."
	},
	{
		id: "g-kagiri",
		pattern: "〜限り",
		meaning: "as long as / as far as",
		level: "N2",
		example: "知っている限り、彼は来ない。",
		exampleReading: "しっているかぎり、かれはこない。",
		exampleMeaning: "As far as I know, he isn't coming.",
		tip: "Scope limiter: as far as X holds."
	},
	{
		id: "g-mashou",
		pattern: "〜ましょう",
		meaning: "let's / offer",
		level: "N5",
		example: "一緒に行きましょう。",
		exampleReading: "いっしょにいきましょう。",
		exampleMeaning: "Let's go together.",
		tip: "ます-stem + ましょう. Also a polite offer."
	},
	{
		id: "g-temoii",
		pattern: "〜てもいい",
		meaning: "may / it's okay to",
		level: "N5",
		example: "入ってもいいですか。",
		exampleReading: "はいってもいいですか。",
		exampleMeaning: "May I come in?",
		tip: "て-form + もいい. Permission."
	},
	{
		id: "g-tewaikenai",
		pattern: "〜てはいけない",
		meaning: "must not",
		level: "N5",
		example: "ここで写真を撮ってはいけない。",
		exampleReading: "ここでしゃしんをとってはいけない。",
		exampleMeaning: "You must not take photos here.",
		tip: "Prohibition. Casual: ちゃだめ."
	},
	{
		id: "g-kudasai",
		pattern: "〜てください",
		meaning: "please do",
		level: "N5",
		example: "待ってください。",
		exampleReading: "まってください。",
		exampleMeaning: "Please wait.",
		tip: "Polite request. Soften with ませんか for invitations."
	},
	{
		id: "g-hazu",
		pattern: "〜はずだ",
		meaning: "ought to / expected",
		level: "N4",
		example: "彼は来るはずだ。",
		exampleReading: "かれはくるはずだ。",
		exampleMeaning: "He ought to come.",
		tip: "Speaker's expectation based on evidence."
	},
	{
		id: "g-rashii",
		pattern: "〜らしい",
		meaning: "seems / typical of",
		level: "N4",
		example: "雨が降るらしい。",
		exampleReading: "あめがふるらしい。",
		exampleMeaning: "It seems it will rain.",
		tip: "Hearsay or typical character (学生らしい)."
	},
	{
		id: "g-mitai",
		pattern: "〜みたい",
		meaning: "looks like / like",
		level: "N4",
		example: "夢みたいだ。",
		exampleReading: "ゆめみたいだ。",
		exampleMeaning: "It's like a dream.",
		tip: "Colloquial resemblance. な-adjective pattern."
	},
	{
		id: "g-tokoro",
		pattern: "〜ところだ",
		meaning: "about to / just did / in the middle",
		level: "N4",
		example: "これから出かけるところです。",
		exampleReading: "これからでかけるところです。",
		exampleMeaning: "I'm just about to go out.",
		tip: "るところ = about to. ているところ = in the middle. たところ = just did."
	},
	{
		id: "g-nichigainai",
		pattern: "〜に違いない",
		meaning: "must be (inference)",
		level: "N3",
		example: "あれは彼に違いない。",
		exampleReading: "あれはかれにちがいない。",
		exampleMeaning: "That must be him.",
		tip: "Strong inference, not obligation."
	},
	{
		id: "g-monoda",
		pattern: "〜ものだ",
		meaning: "that's the way it is / used to",
		level: "N3",
		example: "子供のころよく遊んだものだ。",
		exampleReading: "こどものころよくあそんだものだ。",
		exampleMeaning: "I used to play a lot as a child.",
		tip: "General truth, nostalgia, or mild ought."
	},
	{
		id: "g-hazuganai",
		pattern: "〜はずがない",
		meaning: "cannot be / no way",
		level: "N3",
		example: "彼が忘れるはずがない。",
		exampleReading: "かれがわすれるはずがない。",
		exampleMeaning: "There's no way he would forget.",
		tip: "Negates an expectation."
	},
	{
		id: "g-nikakete",
		pattern: "〜にかけて",
		meaning: "over the period of / when it comes to",
		level: "N2",
		example: "春から夏にかけて雨が多い。",
		exampleReading: "はるからなつにかけてあめがおおい。",
		exampleMeaning: "Rain is common from spring through summer.",
		tip: "Time span, or 'when it comes to X' with は."
	},
	{
		id: "g-omegutte",
		pattern: "〜をめぐって",
		meaning: "over / concerning (dispute)",
		level: "N2",
		example: "計画をめぐって議論した。",
		exampleReading: "けいかくをめぐってぎろんした。",
		exampleMeaning: "We debated over the plan.",
		tip: "Issue that people argue about."
	},
	{
		id: "g-naikotoniwa",
		pattern: "〜ないことには",
		meaning: "unless / without doing",
		level: "N2",
		example: "やってみないことには分からない。",
		exampleReading: "やってみないことにはわからない。",
		exampleMeaning: "You won't know unless you try.",
		tip: "Condition: without X, Y cannot happen."
	}
];
function newCard(id, kind, now = /* @__PURE__ */ new Date()) {
	return {
		id,
		kind,
		ease: 2.5,
		interval: 0,
		reps: 0,
		lapses: 0,
		dueAt: now.toISOString()
	};
}
function reviewCard(card, grade, now = /* @__PURE__ */ new Date()) {
	const next = {
		...card,
		lastGrade: grade
	};
	if (grade === 0) {
		next.reps = 0;
		next.lapses += 1;
		next.interval = 0;
		next.dueAt = new Date(now.getTime() + 6e5).toISOString();
		next.ease = Math.max(1.3, next.ease - .2);
		return next;
	}
	next.ease = Math.max(1.3, next.ease + (.1 - (3 - grade) * (.08 + (3 - grade) * .02)));
	if (next.reps === 0) next.interval = grade === 1 ? .5 : 1;
	else if (next.reps === 1) next.interval = grade === 1 ? 1 : grade === 2 ? 3 : 4;
	else {
		const mult = grade === 1 ? .8 : grade === 2 ? 1 : 1.3;
		next.interval = Math.max(1, Math.round(next.interval * next.ease * mult * 10) / 10);
	}
	next.reps += 1;
	next.dueAt = new Date(now.getTime() + next.interval * 864e5).toISOString();
	return next;
}
function isDue(card, now = /* @__PURE__ */ new Date()) {
	return new Date(card.dueAt).getTime() <= now.getTime();
}
var defaultProfile = () => ({
	name: "",
	startLevel: "pre",
	goalLevel: "N2",
	dailyMinutes: 30,
	startedAt: (/* @__PURE__ */ new Date()).toISOString(),
	onboardingDone: false,
	placementScore: 0,
	updatedAt: (/* @__PURE__ */ new Date()).toISOString()
});
function emptyDay() {
	return {
		minutes: 0,
		reviews: 0,
		newItems: 0,
		xp: 0,
		correct: 0,
		attempts: 0
	};
}
function bumpStreak(state, day, now) {
	let streak = state.streak;
	let lastStreakDate = state.lastStreakDate;
	if (lastStreakDate !== day) {
		const yesterday = todayKey(/* @__PURE__ */ new Date(now.getTime() - 864e5));
		streak = lastStreakDate === yesterday ? streak + 1 : 1;
		lastStreakDate = day;
	}
	return {
		streak,
		lastStreakDate
	};
}
var useLearner = create()(persist((set, get) => ({
	profile: defaultProfile(),
	cards: {},
	daily: {},
	completedReadings: [],
	writings: [],
	chat: [],
	lastStreakDate: null,
	streak: 0,
	completeOnboarding: (p) => {
		set({
			profile: {
				...defaultProfile(),
				...p,
				startedAt: (/* @__PURE__ */ new Date()).toISOString(),
				onboardingDone: true,
				goalLevel: p.goalLevel ?? "N2",
				dailyMinutes: p.dailyMinutes ?? 30,
				name: p.name ?? "",
				placementScore: p.placementScore ?? 0,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			},
			cards: {},
			daily: {},
			completedReadings: [],
			writings: [],
			chat: [],
			streak: 0,
			lastStreakDate: null
		});
	},
	recordReview: (id, kind, grade, isNew) => {
		const state = get();
		const now = /* @__PURE__ */ new Date();
		const day = todayKey(now);
		const nextCard = reviewCard(state.cards[id] ?? newCard(id, kind, now), grade, now);
		const dayLog = { ...state.daily[day] ?? emptyDay() };
		dayLog.attempts += 1;
		dayLog.reviews += 1;
		if (isNew) dayLog.newItems += 1;
		if (grade > 0) {
			dayLog.correct += 1;
			dayLog.xp += grade === 3 ? 15 : grade === 2 ? 10 : 6;
		} else dayLog.xp += 2;
		const { streak, lastStreakDate } = bumpStreak(state, day, now);
		set({
			cards: {
				...state.cards,
				[id]: nextCard
			},
			daily: {
				...state.daily,
				[day]: dayLog
			},
			streak,
			lastStreakDate,
			profile: {
				...state.profile,
				updatedAt: now.toISOString()
			}
		});
	},
	completeReading: (id, correct, total) => {
		const state = get();
		if (state.completedReadings.includes(id)) return;
		const now = /* @__PURE__ */ new Date();
		const day = todayKey(now);
		const dayLog = { ...state.daily[day] ?? emptyDay() };
		dayLog.attempts += total;
		dayLog.correct += correct;
		dayLog.xp += 20 + correct * 5;
		dayLog.minutes += 6;
		const { streak, lastStreakDate } = bumpStreak(state, day, now);
		set({
			completedReadings: [...state.completedReadings, id],
			daily: {
				...state.daily,
				[day]: dayLog
			},
			streak,
			lastStreakDate,
			profile: {
				...state.profile,
				updatedAt: now.toISOString()
			}
		});
	},
	addMinutes: (m) => {
		const day = todayKey();
		const state = get();
		const dayLog = { ...state.daily[day] ?? emptyDay() };
		dayLog.minutes += m;
		set({
			daily: {
				...state.daily,
				[day]: dayLog
			},
			profile: {
				...state.profile,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		});
	},
	addChat: (turn) => {
		const state = get();
		set({
			chat: [...state.chat, turn].slice(-40),
			profile: {
				...state.profile,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		});
	},
	addWriting: (text, feedback) => {
		const state = get();
		set({
			writings: [...state.writings, {
				at: (/* @__PURE__ */ new Date()).toISOString(),
				text,
				feedback
			}].slice(-20),
			profile: {
				...state.profile,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		});
	},
	hydrateRemote: (snap) => {
		const local = get().profile.updatedAt;
		if (snap.profile.updatedAt && snap.profile.updatedAt < local) return;
		set({
			profile: snap.profile,
			cards: snap.cards ?? {},
			daily: snap.daily ?? {},
			completedReadings: snap.completedReadings ?? [],
			writings: snap.writings ?? [],
			chat: snap.chat ?? [],
			lastStreakDate: snap.lastStreakDate,
			streak: snap.streak ?? 0
		});
	},
	resetAll: () => set({
		profile: defaultProfile(),
		cards: {},
		daily: {},
		completedReadings: [],
		writings: [],
		chat: [],
		streak: 0,
		lastStreakDate: null
	})
}), { name: "torii-learner-v1" }));
function snapshotOf(s) {
	return {
		profile: s.profile,
		cards: s.cards,
		daily: s.daily,
		completedReadings: s.completedReadings,
		writings: s.writings,
		chat: s.chat,
		lastStreakDate: s.lastStreakDate,
		streak: s.streak
	};
}
function getSkillScores(cards, readingDone = 0, writingDone = 0) {
	const scoreFor = (ids) => {
		if (!ids.length) return 0;
		let sum = 0;
		for (const id of ids) {
			const c = cards[id];
			if (!c) continue;
			if (c.reps === 0) sum += 8;
			else if (c.interval >= 21) sum += 100;
			else if (c.interval >= 7) sum += 78;
			else if (c.interval >= 2) sum += 52;
			else sum += 28;
		}
		return Math.round(sum / ids.length);
	};
	return {
		kana: scoreFor(ALL_KANA.map((k) => k.id)),
		kanji: scoreFor(KANJI.map((k) => k.id)),
		vocab: scoreFor(VOCAB.map((v) => v.id)),
		grammar: scoreFor(GRAMMAR.map((g) => g.id)),
		reading: Math.min(100, readingDone * 12),
		writing: Math.min(100, writingDone * 18)
	};
}
function estimateLevel(startLevel, skills) {
	if (startLevel === "pre" && skills.kana < 72) return "pre";
	const avg = (skills.kana + skills.kanji + skills.vocab + skills.grammar + skills.reading) / 5;
	if (avg < 32) return "N5";
	if (avg < 52) return "N4";
	if (avg < 72) return "N3";
	return "N2";
}
function dueCount(cards) {
	return Object.values(cards).filter((c) => isDue(c)).length;
}
function accuracyOf(daily) {
	const a = Object.values(daily).reduce((s, d) => s + d.attempts, 0);
	const c = Object.values(daily).reduce((s, d) => s + d.correct, 0);
	return a ? Math.round(c / a * 100) : 0;
}
function compactStats(s) {
	const skills = getSkillScores(s.cards, s.completedReadings.length, s.writings.length);
	const weak = Object.values(s.cards).filter((c) => c.lapses >= 2 || c.lastGrade === 0 && c.reps <= 1).slice(0, 8).map((c) => c.id);
	return {
		name: s.profile.name,
		startLevel: s.profile.startLevel,
		goalLevel: s.profile.goalLevel,
		dailyMinutes: s.profile.dailyMinutes,
		day: Math.max(1, Math.round((Date.UTC((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), (/* @__PURE__ */ new Date()).getDate()) - Date.UTC(new Date(s.profile.startedAt).getFullYear(), new Date(s.profile.startedAt).getMonth(), new Date(s.profile.startedAt).getDate())) / 864e5) + 1),
		streak: s.streak,
		skills,
		dueCount: dueCount(s.cards),
		accuracy: accuracyOf(s.daily),
		totalReviews: Object.values(s.daily).reduce((n, d) => n + d.reviews, 0),
		completedReadings: s.completedReadings.length,
		weakItems: weak
	};
}
//#endregion
export { cn as a, estimateLevel as c, shuffle as d, snapshotOf as f, VOCAB as i, getSkillScores as l, useLearner as m, GRAMMAR as n, compactStats as o, todayKey as p, KANJI as r, dueCount as s, ALL_KANA as t, isDue as u };
