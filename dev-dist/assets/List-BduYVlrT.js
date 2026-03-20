import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import { E as Input, T as composeEventHandlers, _ as dispatchDiscreteCustomEvent, a as Content, b as useControllableState, c as hideOthers, d as Presence, f as Portal$1, g as Primitive, h as useCallbackRef, i as Arrow, l as ReactRemoveScroll, m as DismissableLayer, o as Root2$1, p as FocusScope, r as Anchor, s as createPopperScope, u as useFocusGuards, v as createSlot, w as createContextScope, x as useId } from "./dist-BJ8xlPYd.js";
import { h as useNavigate, o as composeRefs, s as useComposedRefs, t as Button } from "./button-C9ovRcaC.js";
import { r as createLucideIcon } from "./client-CHKWSnDn.js";
import { a as SelectValue, c as ChevronDown, i as SelectTrigger, l as Check, n as SelectContent, o as useDirection, r as SelectItem, s as createCollection, t as Select } from "./select-bm1YM6uf.js";
import { a as Item, c as Pencil, i as TabsTrigger, l as ChevronRight, n as TabsContent, o as Root, r as TabsList, s as createRovingFocusGroupScope, t as Tabs } from "./tabs-GK7WD5Ae.js";
import { t as CircleCheck } from "./circle-check-BAJaZqY7.js";
import { s as Upload } from "./dialog-C-tnSUYQ.js";
import { n as MapPin, t as Badge } from "./badge-BhL_WBhC.js";
import { t as TriangleAlert } from "./triangle-alert-BkTLHhFU.js";
import { o as Skeleton, y as Search } from "./index-BjfTaqc2.js";
import { t as Card } from "./card-Bdo3HtAK.js";
import { t as useRealtime } from "./use-realtime-Dlby_qd3.js";
import { n as useToast } from "./use-toast-D4D9l4c4.js";
import { n as getCitiesByState, r as getCityCoords, t as BR_STATES } from "./brazilCities-CkwWX4ao.js";
import { i as getAgentes } from "./agentes-Clw4W8e7.js";
import { t as ImportAgenteModal } from "./ImportAgenteModal-CObsClz_.js";
var Calculator = createLucideIcon("calculator", [
	["rect", {
		width: "16",
		height: "20",
		x: "4",
		y: "2",
		rx: "2",
		key: "1nb95v"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "6",
		y2: "6",
		key: "x4nwl0"
	}],
	["line", {
		x1: "16",
		x2: "16",
		y1: "14",
		y2: "18",
		key: "wjye3r"
	}],
	["path", {
		d: "M16 10h.01",
		key: "1m94wz"
	}],
	["path", {
		d: "M12 10h.01",
		key: "1nrarc"
	}],
	["path", {
		d: "M8 10h.01",
		key: "19clt8"
	}],
	["path", {
		d: "M12 14h.01",
		key: "1etili"
	}],
	["path", {
		d: "M8 14h.01",
		key: "6423bh"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M8 18h.01",
		key: "lrp35t"
	}]
]);
var Circle = createLucideIcon("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
var UserPlus = createLucideIcon("user-plus", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "19",
		x2: "19",
		y1: "8",
		y2: "14",
		key: "1bvyxn"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "11",
		y2: "11",
		key: "1shjgl"
	}]
]);
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-menu@2.1.16_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_73ff7391b7be14d4dbff03af4dbac090/node_modules/@radix-ui/react-menu/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = [
	"ArrowDown",
	"PageUp",
	"Home"
];
var LAST_KEYS = [
	"ArrowUp",
	"PageDown",
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
	ltr: [...SELECTION_KEYS, "ArrowRight"],
	rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
};
var MENU_NAME = "Menu";
var [Collection, useCollection, createCollectionScope] = createCollection(MENU_NAME);
var [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
	createCollectionScope,
	createPopperScope,
	createRovingFocusGroupScope
]);
var usePopperScope = createPopperScope();
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
var Menu = (props) => {
	const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
	const popperScope = usePopperScope(__scopeMenu);
	const [content, setContent] = import_react.useState(null);
	const isUsingKeyboardRef = import_react.useRef(false);
	const handleOpenChange = useCallbackRef(onOpenChange);
	const direction = useDirection(dir);
	import_react.useEffect(() => {
		const handleKeyDown = () => {
			isUsingKeyboardRef.current = true;
			document.addEventListener("pointerdown", handlePointer, {
				capture: true,
				once: true
			});
			document.addEventListener("pointermove", handlePointer, {
				capture: true,
				once: true
			});
		};
		const handlePointer = () => isUsingKeyboardRef.current = false;
		document.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => {
			document.removeEventListener("keydown", handleKeyDown, { capture: true });
			document.removeEventListener("pointerdown", handlePointer, { capture: true });
			document.removeEventListener("pointermove", handlePointer, { capture: true });
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, {
			scope: __scopeMenu,
			open,
			onOpenChange: handleOpenChange,
			content,
			onContentChange: setContent,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootProvider, {
				scope: __scopeMenu,
				onClose: import_react.useCallback(() => handleOpenChange(false), [handleOpenChange]),
				isUsingKeyboardRef,
				dir: direction,
				modal,
				children
			})
		})
	});
};
Menu.displayName = MENU_NAME;
var ANCHOR_NAME = "MenuAnchor";
var MenuAnchor = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...anchorProps } = props;
	const popperScope = usePopperScope(__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		...popperScope,
		...anchorProps,
		ref: forwardedRef
	});
});
MenuAnchor.displayName = ANCHOR_NAME;
var PORTAL_NAME$1 = "MenuPortal";
var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME$1, { forceMount: void 0 });
var MenuPortal = (props) => {
	const { __scopeMenu, forceMount, children, container } = props;
	const context = useMenuContext(PORTAL_NAME$1, __scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopeMenu,
		forceMount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, {
				asChild: true,
				container,
				children
			})
		})
	});
};
MenuPortal.displayName = PORTAL_NAME$1;
var CONTENT_NAME$1 = "MenuContent";
var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME$1);
var MenuContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeMenu,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeMenu,
				children: rootContext.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContentModal, {
					...contentProps,
					ref: forwardedRef
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContentNonModal, {
					...contentProps,
					ref: forwardedRef
				})
			})
		})
	});
});
var MenuRootContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	import_react.useEffect(() => {
		const content = ref.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: context.open,
		disableOutsideScroll: true,
		onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), { checkForDefaultPrevented: false }),
		onDismiss: () => context.onOpenChange(false)
	});
});
var MenuRootContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		disableOutsideScroll: false,
		onDismiss: () => context.onOpenChange(false)
	});
});
var Slot = createSlot("MenuContent.ScrollLock");
var MenuContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, loop = false, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEntryFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, disableOutsideScroll, ...contentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, __scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, __scopeMenu);
	const popperScope = usePopperScope(__scopeMenu);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
	const getItems = useCollection(__scopeMenu);
	const [currentItemId, setCurrentItemId] = import_react.useState(null);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
	const timerRef = import_react.useRef(0);
	const searchRef = import_react.useRef("");
	const pointerGraceTimerRef = import_react.useRef(0);
	const pointerGraceIntentRef = import_react.useRef(null);
	const pointerDirRef = import_react.useRef("right");
	const lastPointerXRef = import_react.useRef(0);
	const ScrollLockWrapper = disableOutsideScroll ? ReactRemoveScroll : import_react.Fragment;
	const scrollLockWrapperProps = disableOutsideScroll ? {
		as: Slot,
		allowPinchZoom: true
	} : void 0;
	const handleTypeaheadSearch = (key) => {
		const search = searchRef.current + key;
		const items = getItems().filter((item) => !item.disabled);
		const currentItem = document.activeElement;
		const currentMatch = items.find((item) => item.ref.current === currentItem)?.textValue;
		const nextMatch = getNextMatch(items.map((item) => item.textValue), search, currentMatch);
		const newItem = items.find((item) => item.textValue === nextMatch)?.ref.current;
		(function updateSearch(value) {
			searchRef.current = value;
			window.clearTimeout(timerRef.current);
			if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
		})(search);
		if (newItem) setTimeout(() => newItem.focus());
	};
	import_react.useEffect(() => {
		return () => window.clearTimeout(timerRef.current);
	}, []);
	useFocusGuards();
	const isPointerMovingToSubmenu = import_react.useCallback((event) => {
		return pointerDirRef.current === pointerGraceIntentRef.current?.side && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentProvider, {
		scope: __scopeMenu,
		searchRef,
		onItemEnter: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) event.preventDefault();
		}, [isPointerMovingToSubmenu]),
		onItemLeave: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) return;
			contentRef.current?.focus();
			setCurrentItemId(null);
		}, [isPointerMovingToSubmenu]),
		onTriggerLeave: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) event.preventDefault();
		}, [isPointerMovingToSubmenu]),
		pointerGraceTimerRef,
		onPointerGraceIntentChange: import_react.useCallback((intent) => {
			pointerGraceIntentRef.current = intent;
		}, []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollLockWrapper, {
			...scrollLockWrapperProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
				asChild: true,
				trapped: trapFocus,
				onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
					event.preventDefault();
					contentRef.current?.focus({ preventScroll: true });
				}),
				onUnmountAutoFocus: onCloseAutoFocus,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
					asChild: true,
					disableOutsidePointerEvents,
					onEscapeKeyDown,
					onPointerDownOutside,
					onFocusOutside,
					onInteractOutside,
					onDismiss,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
						asChild: true,
						...rovingFocusGroupScope,
						dir: rootContext.dir,
						orientation: "vertical",
						loop,
						currentTabStopId: currentItemId,
						onCurrentTabStopIdChange: setCurrentItemId,
						onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
							if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
						}),
						preventScrollOnEntryFocus: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": getOpenState(context.open),
							"data-radix-menu-content": "",
							dir: rootContext.dir,
							...popperScope,
							...contentProps,
							ref: composedRefs,
							style: {
								outline: "none",
								...contentProps.style
							},
							onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
								const isKeyDownInside = event.target.closest("[data-radix-menu-content]") === event.currentTarget;
								const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
								const isCharacterKey = event.key.length === 1;
								if (isKeyDownInside) {
									if (event.key === "Tab") event.preventDefault();
									if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
								}
								const content = contentRef.current;
								if (event.target !== content) return;
								if (!FIRST_LAST_KEYS.includes(event.key)) return;
								event.preventDefault();
								const candidateNodes = getItems().filter((item) => !item.disabled).map((item) => item.ref.current);
								if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
								focusFirst(candidateNodes);
							}),
							onBlur: composeEventHandlers(props.onBlur, (event) => {
								if (!event.currentTarget.contains(event.target)) {
									window.clearTimeout(timerRef.current);
									searchRef.current = "";
								}
							}),
							onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
								const target = event.target;
								const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
								if (event.currentTarget.contains(target) && pointerXHasChanged) {
									pointerDirRef.current = event.clientX > lastPointerXRef.current ? "right" : "left";
									lastPointerXRef.current = event.clientX;
								}
							}))
						})
					})
				})
			})
		})
	});
});
MenuContent.displayName = CONTENT_NAME$1;
var GROUP_NAME$1 = "MenuGroup";
var MenuGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...groupProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		role: "group",
		...groupProps,
		ref: forwardedRef
	});
});
MenuGroup.displayName = GROUP_NAME$1;
var LABEL_NAME$1 = "MenuLabel";
var MenuLabel = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...labelProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...labelProps,
		ref: forwardedRef
	});
});
MenuLabel.displayName = LABEL_NAME$1;
var ITEM_NAME$1 = "MenuItem";
var ITEM_SELECT = "menu.itemSelect";
var MenuItem = import_react.forwardRef((props, forwardedRef) => {
	const { disabled = false, onSelect, ...itemProps } = props;
	const ref = import_react.useRef(null);
	const rootContext = useMenuRootContext(ITEM_NAME$1, props.__scopeMenu);
	const contentContext = useMenuContentContext(ITEM_NAME$1, props.__scopeMenu);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const isPointerDownRef = import_react.useRef(false);
	const handleSelect = () => {
		const menuItem = ref.current;
		if (!disabled && menuItem) {
			const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
				bubbles: true,
				cancelable: true
			});
			menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
			dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
			if (itemSelectEvent.defaultPrevented) isPointerDownRef.current = false;
			else rootContext.onClose();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemImpl, {
		...itemProps,
		ref: composedRefs,
		disabled,
		onClick: composeEventHandlers(props.onClick, handleSelect),
		onPointerDown: (event) => {
			props.onPointerDown?.(event);
			isPointerDownRef.current = true;
		},
		onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
			if (!isPointerDownRef.current) event.currentTarget?.click();
		}),
		onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
			const isTypingAhead = contentContext.searchRef.current !== "";
			if (disabled || isTypingAhead && event.key === " ") return;
			if (SELECTION_KEYS.includes(event.key)) {
				event.currentTarget.click();
				event.preventDefault();
			}
		})
	});
});
MenuItem.displayName = ITEM_NAME$1;
var MenuItemImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
	const contentContext = useMenuContentContext(ITEM_NAME$1, __scopeMenu);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const [isFocused, setIsFocused] = import_react.useState(false);
	const [textContent, setTextContent] = import_react.useState("");
	import_react.useEffect(() => {
		const menuItem = ref.current;
		if (menuItem) setTextContent((menuItem.textContent ?? "").trim());
	}, [itemProps.children]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeMenu,
		disabled,
		textValue: textValue ?? textContent,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
			asChild: true,
			...rovingFocusGroupScope,
			focusable: !disabled,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "menuitem",
				"data-highlighted": isFocused ? "" : void 0,
				"aria-disabled": disabled || void 0,
				"data-disabled": disabled ? "" : void 0,
				...itemProps,
				ref: composedRefs,
				onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
					if (disabled) contentContext.onItemLeave(event);
					else {
						contentContext.onItemEnter(event);
						if (!event.defaultPrevented) event.currentTarget.focus({ preventScroll: true });
					}
				})),
				onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => contentContext.onItemLeave(event))),
				onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
				onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
			})
		})
	});
});
var CHECKBOX_ITEM_NAME$1 = "MenuCheckboxItem";
var MenuCheckboxItem = import_react.forwardRef((props, forwardedRef) => {
	const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicatorProvider, {
		scope: props.__scopeMenu,
		checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			role: "menuitemcheckbox",
			"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
			...checkboxItemProps,
			ref: forwardedRef,
			"data-state": getCheckedState(checked),
			onSelect: composeEventHandlers(checkboxItemProps.onSelect, () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked), { checkForDefaultPrevented: false })
		})
	});
});
MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME$1;
var RADIO_GROUP_NAME$1 = "MenuRadioGroup";
var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(RADIO_GROUP_NAME$1, {
	value: void 0,
	onValueChange: () => {}
});
var MenuRadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { value, onValueChange, ...groupProps } = props;
	const handleValueChange = useCallbackRef(onValueChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
		scope: props.__scopeMenu,
		value,
		onValueChange: handleValueChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroup, {
			...groupProps,
			ref: forwardedRef
		})
	});
});
MenuRadioGroup.displayName = RADIO_GROUP_NAME$1;
var RADIO_ITEM_NAME$1 = "MenuRadioItem";
var MenuRadioItem = import_react.forwardRef((props, forwardedRef) => {
	const { value, ...radioItemProps } = props;
	const context = useRadioGroupContext(RADIO_ITEM_NAME$1, props.__scopeMenu);
	const checked = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicatorProvider, {
		scope: props.__scopeMenu,
		checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			role: "menuitemradio",
			"aria-checked": checked,
			...radioItemProps,
			ref: forwardedRef,
			"data-state": getCheckedState(checked),
			onSelect: composeEventHandlers(radioItemProps.onSelect, () => context.onValueChange?.(value), { checkForDefaultPrevented: false })
		})
	});
});
MenuRadioItem.displayName = RADIO_ITEM_NAME$1;
var ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(ITEM_INDICATOR_NAME, { checked: false });
var MenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
	const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			...itemIndicatorProps,
			ref: forwardedRef,
			"data-state": getCheckedState(indicatorContext.checked)
		})
	});
});
MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SEPARATOR_NAME$1 = "MenuSeparator";
var MenuSeparator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...separatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...separatorProps,
		ref: forwardedRef
	});
});
MenuSeparator.displayName = SEPARATOR_NAME$1;
var ARROW_NAME$1 = "MenuArrow";
var MenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...arrowProps } = props;
	const popperScope = usePopperScope(__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
		...popperScope,
		...arrowProps,
		ref: forwardedRef
	});
});
MenuArrow.displayName = ARROW_NAME$1;
var SUB_NAME = "MenuSub";
var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
var MenuSub = (props) => {
	const { __scopeMenu, children, open = false, onOpenChange } = props;
	const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
	const popperScope = usePopperScope(__scopeMenu);
	const [trigger, setTrigger] = import_react.useState(null);
	const [content, setContent] = import_react.useState(null);
	const handleOpenChange = useCallbackRef(onOpenChange);
	import_react.useEffect(() => {
		if (parentMenuContext.open === false) handleOpenChange(false);
		return () => handleOpenChange(false);
	}, [parentMenuContext.open, handleOpenChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, {
			scope: __scopeMenu,
			open,
			onOpenChange: handleOpenChange,
			content,
			onContentChange: setContent,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSubProvider, {
				scope: __scopeMenu,
				contentId: useId(),
				triggerId: useId(),
				trigger,
				onTriggerChange: setTrigger,
				children
			})
		})
	});
};
MenuSub.displayName = SUB_NAME;
var SUB_TRIGGER_NAME$1 = "MenuSubTrigger";
var MenuSubTrigger = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const subContext = useMenuSubContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const contentContext = useMenuContentContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const openTimerRef = import_react.useRef(null);
	const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
	const scope = { __scopeMenu: props.__scopeMenu };
	const clearOpenTimer = import_react.useCallback(() => {
		if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
		openTimerRef.current = null;
	}, []);
	import_react.useEffect(() => clearOpenTimer, [clearOpenTimer]);
	import_react.useEffect(() => {
		const pointerGraceTimer = pointerGraceTimerRef.current;
		return () => {
			window.clearTimeout(pointerGraceTimer);
			onPointerGraceIntentChange(null);
		};
	}, [pointerGraceTimerRef, onPointerGraceIntentChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuAnchor, {
		asChild: true,
		...scope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemImpl, {
			id: subContext.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": subContext.contentId,
			"data-state": getOpenState(context.open),
			...props,
			ref: composeRefs(forwardedRef, subContext.onTriggerChange),
			onClick: (event) => {
				props.onClick?.(event);
				if (props.disabled || event.defaultPrevented) return;
				event.currentTarget.focus();
				if (!context.open) context.onOpenChange(true);
			},
			onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
				contentContext.onItemEnter(event);
				if (event.defaultPrevented) return;
				if (!props.disabled && !context.open && !openTimerRef.current) {
					contentContext.onPointerGraceIntentChange(null);
					openTimerRef.current = window.setTimeout(() => {
						context.onOpenChange(true);
						clearOpenTimer();
					}, 100);
				}
			})),
			onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => {
				clearOpenTimer();
				const contentRect = context.content?.getBoundingClientRect();
				if (contentRect) {
					const side = context.content?.dataset.side;
					const rightSide = side === "right";
					const bleed = rightSide ? -5 : 5;
					const contentNearEdge = contentRect[rightSide ? "left" : "right"];
					const contentFarEdge = contentRect[rightSide ? "right" : "left"];
					contentContext.onPointerGraceIntentChange({
						area: [
							{
								x: event.clientX + bleed,
								y: event.clientY
							},
							{
								x: contentNearEdge,
								y: contentRect.top
							},
							{
								x: contentFarEdge,
								y: contentRect.top
							},
							{
								x: contentFarEdge,
								y: contentRect.bottom
							},
							{
								x: contentNearEdge,
								y: contentRect.bottom
							}
						],
						side
					});
					window.clearTimeout(pointerGraceTimerRef.current);
					pointerGraceTimerRef.current = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
				} else {
					contentContext.onTriggerLeave(event);
					if (event.defaultPrevented) return;
					contentContext.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				const isTypingAhead = contentContext.searchRef.current !== "";
				if (props.disabled || isTypingAhead && event.key === " ") return;
				if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
					context.onOpenChange(true);
					context.content?.focus();
					event.preventDefault();
				}
			})
		})
	});
});
MenuSubTrigger.displayName = SUB_TRIGGER_NAME$1;
var SUB_CONTENT_NAME$1 = "MenuSubContent";
var MenuSubContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
	const { forceMount = portalContext.forceMount, ...subContentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
	const subContext = useMenuSubContext(SUB_CONTENT_NAME$1, props.__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeMenu,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeMenu,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
					id: subContext.contentId,
					"aria-labelledby": subContext.triggerId,
					...subContentProps,
					ref: composedRefs,
					align: "start",
					side: rootContext.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: false,
					disableOutsideScroll: false,
					trapFocus: false,
					onOpenAutoFocus: (event) => {
						if (rootContext.isUsingKeyboardRef.current) ref.current?.focus();
						event.preventDefault();
					},
					onCloseAutoFocus: (event) => event.preventDefault(),
					onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
						if (event.target !== subContext.trigger) context.onOpenChange(false);
					}),
					onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
						rootContext.onClose();
						event.preventDefault();
					}),
					onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
						const isKeyDownInside = event.currentTarget.contains(event.target);
						const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							context.onOpenChange(false);
							subContext.trigger?.focus();
							event.preventDefault();
						}
					})
				})
			})
		})
	});
});
MenuSubContent.displayName = SUB_CONTENT_NAME$1;
function getOpenState(open) {
	return open ? "open" : "closed";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getCheckedState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus();
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const ii = polygon[i];
		const jj = polygon[j];
		const xi = ii.x;
		const yi = ii.y;
		const xj = jj.x;
		const yj = jj.y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon({
		x: event.clientX,
		y: event.clientY
	}, area);
}
function whenMouse(handler) {
	return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var Root3 = Menu;
var Anchor2 = MenuAnchor;
var Portal = MenuPortal;
var Content2$1 = MenuContent;
var Group = MenuGroup;
var Label = MenuLabel;
var Item2$1 = MenuItem;
var CheckboxItem = MenuCheckboxItem;
var RadioGroup = MenuRadioGroup;
var RadioItem = MenuRadioItem;
var ItemIndicator = MenuItemIndicator;
var Separator = MenuSeparator;
var Arrow2 = MenuArrow;
var SubTrigger = MenuSubTrigger;
var SubContent = MenuSubContent;
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-dropdown-menu@2.1.16_@types+react-dom@19.2.3_@types+react@19.2.14__@typ_73af8346b6b2e99f5d79f55f5dac0b34/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(DROPDOWN_MENU_NAME, [createMenuScope]);
var useMenuScope = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu$1 = (props) => {
	const { __scopeDropdownMenu, children, dir, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const triggerRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DROPDOWN_MENU_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuProvider, {
		scope: __scopeDropdownMenu,
		triggerId: useId(),
		triggerRef,
		contentId: useId(),
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, {
			...menuScope,
			open,
			onOpenChange: setOpen,
			dir,
			modal,
			children
		})
	});
};
DropdownMenu$1.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME = "DropdownMenuTrigger";
var DropdownMenuTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
	const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor2, {
		asChild: true,
		...menuScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			id: context.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": context.open ? context.contentId : void 0,
			"data-state": context.open ? "open" : "closed",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			...triggerProps,
			ref: composeRefs(forwardedRef, context.triggerRef),
			onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) {
					context.onOpenToggle();
					if (!context.open) event.preventDefault();
				}
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (disabled) return;
				if (["Enter", " "].includes(event.key)) context.onOpenToggle();
				if (event.key === "ArrowDown") context.onOpenChange(true);
				if ([
					"Enter",
					" ",
					"ArrowDown"
				].includes(event.key)) event.preventDefault();
			})
		})
	});
});
DropdownMenuTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DropdownMenuPortal";
var DropdownMenuPortal$1 = (props) => {
	const { __scopeDropdownMenu, ...portalProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...menuScope,
		...portalProps
	});
};
DropdownMenuPortal$1.displayName = PORTAL_NAME;
var CONTENT_NAME = "DropdownMenuContent";
var DropdownMenuContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...contentProps } = props;
	const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const hasInteractedOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		id: context.contentId,
		"aria-labelledby": context.triggerId,
		...menuScope,
		...contentProps,
		ref: forwardedRef,
		onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
			if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
			hasInteractedOutsideRef.current = false;
			event.preventDefault();
		}),
		onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
			if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
		}),
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuContent$1.displayName = CONTENT_NAME;
var GROUP_NAME = "DropdownMenuGroup";
var DropdownMenuGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...groupProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		...menuScope,
		...groupProps,
		ref: forwardedRef
	});
});
DropdownMenuGroup$1.displayName = GROUP_NAME;
var LABEL_NAME = "DropdownMenuLabel";
var DropdownMenuLabel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...labelProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		...menuScope,
		...labelProps,
		ref: forwardedRef
	});
});
DropdownMenuLabel$1.displayName = LABEL_NAME;
var ITEM_NAME = "DropdownMenuItem";
var DropdownMenuItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2$1, {
		...menuScope,
		...itemProps,
		ref: forwardedRef
	});
});
DropdownMenuItem$1.displayName = ITEM_NAME;
var CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...checkboxItemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxItem, {
		...menuScope,
		...checkboxItemProps,
		ref: forwardedRef
	});
});
DropdownMenuCheckboxItem$1.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioGroupProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
		...menuScope,
		...radioGroupProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioGroup$1.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "DropdownMenuRadioItem";
var DropdownMenuRadioItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioItemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioItem, {
		...menuScope,
		...radioItemProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioItem$1.displayName = RADIO_ITEM_NAME;
var INDICATOR_NAME = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, {
		...menuScope,
		...itemIndicatorProps,
		ref: forwardedRef
	});
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME = "DropdownMenuSeparator";
var DropdownMenuSeparator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...separatorProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		...menuScope,
		...separatorProps,
		ref: forwardedRef
	});
});
DropdownMenuSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "DropdownMenuArrow";
var DropdownMenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...arrowProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow2, {
		...menuScope,
		...arrowProps,
		ref: forwardedRef
	});
});
DropdownMenuArrow.displayName = ARROW_NAME;
var SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subTriggerProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTrigger, {
		...menuScope,
		...subTriggerProps,
		ref: forwardedRef
	});
});
DropdownMenuSubTrigger$1.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "DropdownMenuSubContent";
var DropdownMenuSubContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subContentProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent, {
		...menuScope,
		...subContentProps,
		ref: forwardedRef,
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuSubContent$1.displayName = SUB_CONTENT_NAME;
var Root2 = DropdownMenu$1;
var Trigger = DropdownMenuTrigger$1;
var Portal2 = DropdownMenuPortal$1;
var Content2 = DropdownMenuContent$1;
var Label2 = DropdownMenuLabel$1;
var Item2 = DropdownMenuItem$1;
var CheckboxItem2 = DropdownMenuCheckboxItem$1;
var RadioItem2 = DropdownMenuRadioItem$1;
var ItemIndicator2 = DropdownMenuItemIndicator;
var Separator2 = DropdownMenuSeparator$1;
var SubTrigger2 = DropdownMenuSubTrigger$1;
var SubContent2 = DropdownMenuSubContent$1;
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:26:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
		"data-uid": "src/components/ui/dropdown-menu.tsx:36:5",
		"data-prohibitions": "[editContent]",
		className: "ml-auto"
	})]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:45:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:60:3",
	"data-prohibitions": "[editContent]",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-uid": "src/components/ui/dropdown-menu.tsx:61:5",
		"data-prohibitions": "[editContent]",
		ref,
		sideOffset,
		className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]", className),
		...props
	})
}));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:80:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:96:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/dropdown-menu.tsx:105:5",
		"data-prohibitions": "[]",
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, {
			"data-uid": "src/components/ui/dropdown-menu.tsx:106:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				"data-uid": "src/components/ui/dropdown-menu.tsx:107:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			})
		})
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:119:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/dropdown-menu.tsx:127:5",
		"data-prohibitions": "[]",
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, {
			"data-uid": "src/components/ui/dropdown-menu.tsx:128:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
				"data-uid": "src/components/ui/dropdown-menu.tsx:129:9",
				"data-prohibitions": "[editContent]",
				className: "h-2 w-2 fill-current"
			})
		})
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:143:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:155:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/dropdown-menu.tsx:164:10",
		"data-prohibitions": "[editContent]",
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region src/components/ui/table.tsx
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/table.tsx:8:5",
	"data-prohibitions": "[editContent]",
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		"data-uid": "src/components/ui/table.tsx:9:7",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	"data-uid": "src/components/ui/table.tsx:19:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	"data-uid": "src/components/ui/table.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	"data-uid": "src/components/ui/table.tsx:35:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	"data-uid": "src/components/ui/table.tsx:45:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	"data-uid": "src/components/ui/table.tsx:61:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	"data-uid": "src/components/ui/table.tsx:76:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	"data-uid": "src/components/ui/table.tsx:88:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
//#endregion
//#region src/hooks/use-agentes.ts
function useAgentes() {
	const [agentes, setAgentes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast } = useToast();
	const fetchAgentes = (0, import_react.useCallback)(async () => {
		try {
			setAgentes(await getAgentes());
		} catch (err) {
			console.error("Failed to fetch agentes", err);
			toast({
				title: "Erro",
				description: "Erro ao carregar agentes.",
				variant: "destructive"
			});
		} finally {
			setLoading(false);
		}
	}, [toast]);
	(0, import_react.useEffect)(() => {
		fetchAgentes();
	}, [fetchAgentes]);
	useRealtime("agentes", () => {
		fetchAgentes();
	});
	return {
		agentes,
		loading,
		refresh: fetchAgentes
	};
}
//#endregion
//#region src/hooks/use-geo-distance.ts
function useGeoDistance() {
	const calculateDistance = (0, import_react.useCallback)((lat1, lon1, lat2, lon2) => {
		const R = 6371;
		const dLat = (lat2 - lat1) * Math.PI / 180;
		const dLon = (lon2 - lon1) * Math.PI / 180;
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
	}, []);
	return {
		calculateDistance,
		findNearestAgent: (0, import_react.useCallback)((investigationCoords, agents) => {
			if (!agents.length) return null;
			let nearest = null;
			let minDistance = Infinity;
			for (const agent of agents) {
				const dist = calculateDistance(investigationCoords.lat, investigationCoords.lon, agent.lat, agent.lon);
				if (dist < minDistance) {
					minDistance = dist;
					nearest = agent;
				}
			}
			return nearest ? {
				agent: nearest,
				distance: minDistance
			} : null;
		}, [calculateDistance])
	};
}
//#endregion
//#region src/components/InteractiveMapBrazil.tsx
function InteractiveMapBrazil({ investigationCoords, agents, nearestAgentId, onSelectAgent, distances }) {
	const mapContainerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		const L = window.L;
		if (!L) {
			toast({
				title: "Erro ao carregar mapa",
				variant: "destructive"
			});
			return;
		}
		if (!mapContainerRef.current) return;
		if (!mapRef.current) {
			mapRef.current = L.map(mapContainerRef.current).setView([-14.235, -51.9253], 4);
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors" }).addTo(mapRef.current);
		}
		const map = mapRef.current;
		map.eachLayer((layer) => {
			if (layer instanceof L.Marker || layer instanceof L.Polyline) map.removeLayer(layer);
		});
		const markers = [];
		const createIcon = (color, glow = false) => L.divIcon({
			className: glow ? "leaflet-marker-glow" : "",
			html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
			iconSize: [16, 16],
			iconAnchor: [8, 8],
			popupAnchor: [0, -8]
		});
		agents.forEach((agent) => {
			const isNearest = agent.id === nearestAgentId;
			const icon = createIcon(isNearest ? "#22c55e" : "#3b82f6", isNearest);
			const marker = L.marker([agent.lat, agent.lon], { icon }).addTo(map);
			const dist = distances?.[agent.id];
			const distStr = dist ? `<br/>Distância: ${dist.toFixed(1)} km` : "";
			const costStr = agent.valorHora > 0 ? `<br/>Valor/h: R$ ${agent.valorHora.toFixed(2)}` : "";
			marker.bindPopup(`<b>${agent.name}</b>${distStr}${costStr}`);
			marker.on("click", () => onSelectAgent(agent.id));
			markers.push(marker);
			if (investigationCoords) L.polyline([[investigationCoords.lat, investigationCoords.lon], [agent.lat, agent.lon]], {
				color: isNearest ? "#22c55e" : "#9ca3af",
				weight: isNearest ? 3 : 1,
				opacity: isNearest ? 1 : .4
			}).addTo(map);
		});
		if (investigationCoords) {
			const invIcon = createIcon("#ef4444");
			const invMarker = L.marker([investigationCoords.lat, investigationCoords.lon], { icon: invIcon }).addTo(map);
			invMarker.bindPopup("<b>Local da Investigação</b>");
			markers.push(invMarker);
		}
		if (markers.length > 0) {
			const group = L.featureGroup(markers);
			map.fitBounds(group.getBounds(), { padding: [50, 50] });
		} else map.setView([-14.235, -51.9253], 4);
	}, [
		investigationCoords,
		agents,
		nearestAgentId,
		distances,
		onSelectAgent,
		toast
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/InteractiveMapBrazil.tsx:107:5",
		"data-prohibitions": "[editContent]",
		ref: mapContainerRef,
		className: "w-full h-full rounded-2xl z-0 relative isolate",
		"aria-label": "Mapa interativo Brasil - agentes proximos"
	});
}
//#endregion
//#region src/components/agentes/InvestigationMap.tsx
function InvestigationMap({ agentes, loading }) {
	const [invState, setInvState] = (0, import_react.useState)("");
	const [invCity, setInvCity] = (0, import_react.useState)("");
	const [invCoords, setInvCoords] = (0, import_react.useState)(null);
	const [nearestId, setNearestId] = (0, import_react.useState)(null);
	const [distances, setDistances] = (0, import_react.useState)({});
	const { calculateDistance, findNearestAgent } = useGeoDistance();
	const navigate = useNavigate();
	const cities = (0, import_react.useMemo)(() => invState ? getCitiesByState(invState) : [], [invState]);
	const mappedAgents = (0, import_react.useMemo)(() => {
		return agentes.filter((a) => a.ativo === "Sim" && a.base_atendimento_cidade && a.base_atendimento_estado).map((a) => {
			const coords = getCityCoords(a.base_atendimento_cidade, a.base_atendimento_estado);
			if (!coords) return null;
			return {
				id: a.id,
				name: a.nomeCompleto,
				lat: coords.lat,
				lon: coords.lon,
				valorHora: a.valor_hora || a.valorHonorario || 0
			};
		}).filter(Boolean);
	}, [agentes]);
	const handleCalculate = () => {
		const coords = getCityCoords(invCity, invState);
		if (!coords) return;
		setInvCoords(coords);
		const result = findNearestAgent(coords, mappedAgents);
		if (result) {
			setNearestId(result.agent.id);
			const newDistances = {};
			mappedAgents.forEach((a) => {
				newDistances[a.id] = calculateDistance(coords.lat, coords.lon, a.lat, a.lon);
			});
			setDistances(newDistances);
		}
	};
	const selectedAgentInfo = (0, import_react.useMemo)(() => {
		if (!nearestId || !distances[nearestId]) return null;
		const a = mappedAgents.find((x) => x.id === nearestId);
		if (!a) return null;
		return {
			...a,
			distance: distances[nearestId],
			estimatedCost: distances[nearestId] * a.valorHora
		};
	}, [
		nearestId,
		distances,
		mappedAgents
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
		"data-uid": "src/components/agentes/InvestigationMap.tsx:81:12",
		"data-prohibitions": "[editContent]",
		className: "w-full h-[500px] rounded-2xl"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/agentes/InvestigationMap.tsx:85:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-2xl shadow-sm border-none overflow-hidden flex flex-col mt-6 animate-in fade-in zoom-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/InvestigationMap.tsx:86:7",
				"data-prohibitions": "[editContent]",
				className: "p-4 sm:p-6 bg-muted/10 border-b border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:87:9",
					"data-prohibitions": "[]",
					className: "text-lg font-bold text-primary mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:88:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-secondary"
					}), " Inteligência Logística"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:90:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-wrap gap-4 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:91:11",
							"data-prohibitions": "[editContent]",
							className: "flex-1 min-w-[200px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:92:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground mb-1.5 block",
								children: "Estado da Investigação"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:95:13",
								"data-prohibitions": "[editContent]",
								value: invState,
								onValueChange: (v) => {
									setInvState(v);
									setInvCity("");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:102:15",
									"data-prohibitions": "[]",
									className: "h-12 rounded-xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:103:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione o estado..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:105:15",
									"data-prohibitions": "[editContent]",
									children: BR_STATES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:107:19",
										"data-prohibitions": "[editContent]",
										value: s,
										children: s
									}, s))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:114:11",
							"data-prohibitions": "[editContent]",
							className: "flex-1 min-w-[200px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:115:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground mb-1.5 block",
								children: "Cidade da Investigação"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:118:13",
								"data-prohibitions": "[editContent]",
								value: invCity,
								onValueChange: setInvCity,
								disabled: !invState,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:119:15",
									"data-prohibitions": "[]",
									className: "h-12 rounded-xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:120:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione a cidade..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:122:15",
									"data-prohibitions": "[editContent]",
									children: cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:124:19",
										"data-prohibitions": "[editContent]",
										value: c.name,
										children: c.name
									}, c.name))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:131:11",
							"data-prohibitions": "[]",
							onClick: handleCalculate,
							disabled: !invCity,
							className: "h-12 px-6 rounded-xl bg-secondary text-white hover:bg-secondary/90 font-semibold gap-2 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:136:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Calcular Mais Próximo"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/InvestigationMap.tsx:141:7",
				"data-prohibitions": "[editContent]",
				className: "relative w-full h-[400px] md:h-[500px] bg-muted/30",
				children: [!invCoords ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:143:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-muted/10 backdrop-blur-[1px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:144:13",
						"data-prohibitions": "[editContent]",
						className: "w-10 h-10 mb-3 opacity-50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:145:13",
						"data-prohibitions": "[]",
						className: "font-medium",
						children: "Selecione estado/cidade da investigação"
					})]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveMapBrazil, {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:148:9",
					"data-prohibitions": "[editContent]",
					agents: mappedAgents,
					investigationCoords: invCoords,
					nearestAgentId: nearestId,
					distances,
					onSelectAgent: (id) => setNearestId(id)
				})]
			}),
			selectedAgentInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/InvestigationMap.tsx:158:9",
				"data-prohibitions": "[editContent]",
				className: "p-4 sm:p-6 bg-green-50 border-t border-green-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:159:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:160:13",
						"data-prohibitions": "[editContent]",
						className: "font-bold text-green-900 text-lg flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:161:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-green-600"
							}),
							"Agente sugerido: ",
							selectedAgentInfo.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:164:13",
						"data-prohibitions": "[editContent]",
						className: "flex gap-4 mt-2 text-sm text-green-800 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:165:15",
							"data-prohibitions": "[editContent]",
							children: [
								"Distância: ",
								selectedAgentInfo.distance.toFixed(1),
								" km"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:166:15",
							"data-prohibitions": "[editContent]",
							children: ["Custo Estimado: R$ ", selectedAgentInfo.estimatedCost.toFixed(2)]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:169:11",
					"data-prohibitions": "[]",
					className: "rounded-xl h-11 px-8 bg-green-600 hover:bg-green-700 text-white font-bold w-full sm:w-auto shadow-sm",
					onClick: () => navigate(`/agentes/${selectedAgentInfo.id}`),
					children: "Selecionar Agente"
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/agentes/List.tsx
function AgentesList() {
	const { agentes, loading } = useAgentes();
	const navigate = useNavigate();
	const [searchMode, setSearchMode] = (0, import_react.useState)("Nome");
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Todos");
	const [blacklist, setBlacklist] = (0, import_react.useState)("Todos");
	const [isImportModalOpen, setIsImportModalOpen] = (0, import_react.useState)(false);
	const filtered = agentes.filter((p) => {
		if (searchMode === "Nome") return p.nomeCompleto.toLowerCase().includes(search.toLowerCase()) || p.cpf && p.cpf.includes(search) || p.cnpj && p.cnpj.includes(search) || p.numero_controle && p.numero_controle.toLowerCase().includes(search.toLowerCase());
		if (searchMode === "Região") return (p.base_atendimento_cidade || "").toLowerCase().includes(search.toLowerCase()) || (p.base_atendimento_estado || "").toLowerCase().includes(search.toLowerCase()) || (p.baseAtendimento || "").toLowerCase().includes(search.toLowerCase()) || (p.regiaoAbrangencia || "").toLowerCase().includes(search.toLowerCase());
		if (searchMode === "Status/Blacklist") {
			const matchStatus = status === "Todos" || p.ativo === status;
			const matchBl = blacklist === "Todos" || p.naBlackList === blacklist;
			return matchStatus && matchBl;
		}
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/List.tsx:71:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col gap-6 h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/List.tsx:72:7",
				"data-prohibitions": "[]",
				className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/List.tsx:73:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/agentes/List.tsx:74:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight text-primary",
						children: "Agentes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/agentes/List.tsx:75:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground mt-1",
						children: "Gerencie a rede de agentes externos."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
					"data-uid": "src/pages/agentes/List.tsx:78:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						"data-uid": "src/pages/agentes/List.tsx:79:11",
						"data-prohibitions": "[]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/List.tsx:80:13",
							"data-prohibitions": "[]",
							className: "rounded-xl shadow-sm px-6 bg-secondary text-white hover:bg-secondary/90 font-semibold h-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
									"data-uid": "src/pages/agentes/List.tsx:81:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 mr-2"
								}),
								" Novo Agente",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									"data-uid": "src/pages/agentes/List.tsx:82:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 ml-2"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						"data-uid": "src/pages/agentes/List.tsx:85:11",
						"data-prohibitions": "[]",
						align: "end",
						className: "w-56 rounded-xl border-border shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/pages/agentes/List.tsx:86:13",
							"data-prohibitions": "[]",
							className: "cursor-pointer py-3 font-medium text-primary hover:bg-muted focus:bg-muted",
							onClick: () => navigate("/agentes/novo"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
								"data-uid": "src/pages/agentes/List.tsx:90:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-3"
							}), " Preencher Manualmente"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/pages/agentes/List.tsx:92:13",
							"data-prohibitions": "[]",
							className: "cursor-pointer py-3 font-medium text-primary hover:bg-muted focus:bg-muted",
							onClick: () => setIsImportModalOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								"data-uid": "src/pages/agentes/List.tsx:96:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-3"
							}), " Importar Planilha"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/agentes/List.tsx:102:7",
				"data-prohibitions": "[editContent]",
				defaultValue: "list",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/agentes/List.tsx:103:9",
						"data-prohibitions": "[]",
						className: "grid w-full max-w-[400px] grid-cols-2 h-12 rounded-xl bg-muted/50 p-1 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/agentes/List.tsx:104:11",
							"data-prohibitions": "[]",
							value: "list",
							className: "rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm",
							children: "Lista de Agentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/agentes/List.tsx:110:11",
							"data-prohibitions": "[]",
							value: "map",
							className: "rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm",
							children: "Mapa Logístico"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/agentes/List.tsx:118:9",
						"data-prohibitions": "[editContent]",
						value: "list",
						className: "mt-0 flex flex-col gap-6 h-full outline-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/agentes/List.tsx:119:11",
							"data-prohibitions": "[editContent]",
							className: "p-4 flex flex-wrap gap-4 shadow-sm rounded-2xl border-none items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/List.tsx:120:13",
								"data-prohibitions": "[]",
								className: "w-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/agentes/List.tsx:121:15",
									"data-prohibitions": "[]",
									value: searchMode,
									onValueChange: setSearchMode,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/agentes/List.tsx:122:17",
										"data-prohibitions": "[]",
										className: "h-12 bg-muted/30 border-none rounded-xl min-w-[200px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/agentes/List.tsx:123:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Tipo de Busca"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/agentes/List.tsx:125:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:126:19",
												"data-prohibitions": "[]",
												value: "Nome",
												children: "Buscar: Nome"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:127:19",
												"data-prohibitions": "[]",
												value: "Status/Blacklist",
												children: "Filtro: Status/Blacklist"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:128:19",
												"data-prohibitions": "[]",
												value: "Região",
												children: "Buscar: Região"
											})
										]
									})]
								})
							}), searchMode === "Nome" || searchMode === "Região" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:134:15",
								"data-prohibitions": "[]",
								className: "flex-1 min-w-[200px] relative animate-in fade-in zoom-in duration-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									"data-uid": "src/pages/agentes/List.tsx:135:17",
									"data-prohibitions": "[editContent]",
									className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/agentes/List.tsx:136:17",
									"data-prohibitions": "[editContent]",
									placeholder: searchMode === "Nome" ? "Buscar por nome ou documento..." : "Buscar por cidade ou estado...",
									className: "pl-11 h-12 bg-muted/30 border-none rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-secondary/50",
									value: search,
									onChange: (e) => setSearch(e.target.value)
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:148:15",
								"data-prohibitions": "[]",
								className: "flex flex-1 flex-wrap gap-4 animate-in fade-in zoom-in duration-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/List.tsx:149:17",
									"data-prohibitions": "[]",
									className: "w-full sm:w-48",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/agentes/List.tsx:150:19",
										"data-prohibitions": "[]",
										value: status,
										onValueChange: setStatus,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/agentes/List.tsx:151:21",
											"data-prohibitions": "[]",
											className: "h-12 bg-muted/30 border-none rounded-xl",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/agentes/List.tsx:152:23",
												"data-prohibitions": "[editContent]",
												placeholder: "Status"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/agentes/List.tsx:154:21",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:155:23",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Status: Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:156:23",
													"data-prohibitions": "[]",
													value: "Sim",
													children: "Ativos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:157:23",
													"data-prohibitions": "[]",
													value: "Não",
													children: "Inativos"
												})
											]
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/List.tsx:161:17",
									"data-prohibitions": "[]",
									className: "w-full sm:w-48",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/agentes/List.tsx:162:19",
										"data-prohibitions": "[]",
										value: blacklist,
										onValueChange: setBlacklist,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/agentes/List.tsx:163:21",
											"data-prohibitions": "[]",
											className: "h-12 bg-muted/30 border-none rounded-xl",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/agentes/List.tsx:164:23",
												"data-prohibitions": "[editContent]",
												placeholder: "Black List"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/agentes/List.tsx:166:21",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:167:23",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Black List: Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:168:23",
													"data-prohibitions": "[]",
													value: "Sim",
													children: "Apenas Black List"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:169:23",
													"data-prohibitions": "[]",
													value: "Não",
													children: "Sem Black List"
												})
											]
										})]
									})
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/agentes/List.tsx:177:11",
							"data-prohibitions": "[editContent]",
							className: "rounded-2xl shadow-sm border-none overflow-hidden flex-1 flex flex-col",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/List.tsx:179:15",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col gap-4 p-6",
								children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/agentes/List.tsx:181:19",
									"data-prohibitions": "[editContent]",
									className: "h-14 w-full rounded-xl bg-muted/50"
								}, i))
							}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:185:15",
								"data-prohibitions": "[]",
								className: "flex-1 flex flex-col items-center justify-center py-20 text-muted-foreground animate-in fade-in",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/agentes/List.tsx:186:17",
										"data-prohibitions": "[]",
										className: "w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											"data-uid": "src/pages/agentes/List.tsx:187:19",
											"data-prohibitions": "[editContent]",
											className: "w-8 h-8 text-muted-foreground"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/agentes/List.tsx:189:17",
										"data-prohibitions": "[]",
										className: "text-xl font-bold text-primary mb-1",
										children: "Nenhum agente encontrado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/agentes/List.tsx:190:17",
										"data-prohibitions": "[]",
										className: "text-sm",
										children: "Tente ajustar os filtros de busca ou adicione um novo agente."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/List.tsx:195:15",
								"data-prohibitions": "[editContent]",
								className: "overflow-auto flex-1 animate-in fade-in",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
									"data-uid": "src/pages/agentes/List.tsx:196:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/agentes/List.tsx:197:19",
										"data-prohibitions": "[]",
										className: "bg-muted/30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/agentes/List.tsx:198:21",
											"data-prohibitions": "[]",
											className: "border-b-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:199:23",
													"data-prohibitions": "[]",
													className: "pl-6 py-4 font-semibold text-muted-foreground",
													children: "Nome Completo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:202:23",
													"data-prohibitions": "[]",
													className: "py-4 font-semibold text-muted-foreground",
													children: "CPF/CNPJ"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:205:23",
													"data-prohibitions": "[]",
													className: "py-4 font-semibold text-muted-foreground",
													children: "Região"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:208:23",
													"data-prohibitions": "[]",
													className: "py-4 font-semibold text-muted-foreground",
													children: "Valor Hora"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:211:23",
													"data-prohibitions": "[]",
													className: "py-4 font-semibold text-muted-foreground",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:214:23",
													"data-prohibitions": "[]",
													className: "py-4 font-semibold text-muted-foreground text-right pr-6",
													children: "Ações"
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
										"data-uid": "src/pages/agentes/List.tsx:219:19",
										"data-prohibitions": "[editContent]",
										children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/agentes/List.tsx:221:23",
											"data-prohibitions": "[editContent]",
											className: "cursor-pointer hover:bg-muted/20 border-b-border/50 transition-colors",
											onClick: () => navigate(`/agentes/${p.id}`),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:226:25",
													"data-prohibitions": "[editContent]",
													className: "pl-6 font-semibold text-primary py-4 flex items-center gap-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														"data-uid": "src/pages/agentes/List.tsx:227:27",
														"data-prohibitions": "[editContent]",
														src: `https://img.usecurling.com/ppl/thumbnail?seed=${p.id}&gender=male`,
														className: "w-10 h-10 rounded-full border-2 border-white shadow-sm",
														alt: "Avatar"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/agentes/List.tsx:232:27",
														"data-prohibitions": "[editContent]",
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/agentes/List.tsx:233:29",
															"data-prohibitions": "[editContent]",
															children: p.nomeCompleto
														}), p.numero_controle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/agentes/List.tsx:235:31",
															"data-prohibitions": "[editContent]",
															className: "text-xs font-medium text-muted-foreground",
															children: p.numero_controle
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:241:25",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground font-medium",
													children: p.cpf || p.cnpj || "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:244:25",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground",
													children: p.base_atendimento_cidade && p.base_atendimento_estado ? `${p.base_atendimento_cidade} - ${p.base_atendimento_estado}` : p.baseAtendimento || p.regiaoAbrangencia || "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:249:25",
													"data-prohibitions": "[editContent]",
													className: "font-bold text-primary",
													children: ["R$ ", Number(p.valor_hora || p.valorHonorario || 0).toFixed(2)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:252:25",
													"data-prohibitions": "[editContent]",
													children: p.naBlackList === "Sim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														"data-uid": "src/pages/agentes/List.tsx:254:29",
														"data-prohibitions": "[]",
														variant: "destructive",
														className: "bg-destructive/10 text-destructive border-0 hover:bg-destructive/20 font-bold px-3 py-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
															"data-uid": "src/pages/agentes/List.tsx:258:31",
															"data-prohibitions": "[editContent]",
															className: "w-3 h-3 mr-1.5"
														}), " Black List"]
													}) : p.ativo === "Sim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/agentes/List.tsx:261:29",
														"data-prohibitions": "[]",
														variant: "secondary",
														className: "bg-secondary/10 text-secondary border-0 hover:bg-secondary/20 font-bold px-3 py-1",
														children: "Ativo"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/agentes/List.tsx:268:29",
														"data-prohibitions": "[]",
														variant: "outline",
														className: "text-muted-foreground border-muted-foreground/30 font-bold px-3 py-1",
														children: "Inativo"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:276:25",
													"data-prohibitions": "[]",
													className: "text-right pr-6",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/agentes/List.tsx:277:27",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														className: "h-8 w-8 text-muted-foreground hover:text-primary hover:bg-muted",
														onClick: (e) => {
															e.stopPropagation();
															navigate(`/agentes/${p.id}/editar`);
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
															"data-uid": "src/pages/agentes/List.tsx:286:29",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})
												})
											]
										}, p.id))
									})]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/agentes/List.tsx:298:9",
						"data-prohibitions": "[]",
						value: "map",
						className: "mt-0 outline-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationMap, {
							"data-uid": "src/pages/agentes/List.tsx:299:11",
							"data-prohibitions": "[editContent]",
							agentes,
							loading
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportAgenteModal, {
				"data-uid": "src/pages/agentes/List.tsx:303:7",
				"data-prohibitions": "[editContent]",
				open: isImportModalOpen,
				onOpenChange: setIsImportModalOpen
			})
		]
	});
}
//#endregion
export { AgentesList as default };

//# sourceMappingURL=List-BduYVlrT.js.map