import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { t as Slot } from "./dist-DaqhQ5tz.js";
import { t as cn } from "./utils-BmdpXeKV.js";
import { t as Label } from "./label-B6kYntjL.js";
import { a as useFormContext, n as Controller, r as FormProvider } from "./zod-2HxOWlHO.js";
//#region src/components/ui/form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Form = FormProvider;
var FormFieldContext = import_react.createContext({});
var FormField = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFieldContext.Provider, {
		"data-uid": "src/components/ui/form.tsx:35:5",
		"data-prohibitions": "[]",
		value: { name: props.name },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
			"data-uid": "src/components/ui/form.tsx:36:7",
			"data-prohibitions": "[editContent]",
			...props
		})
	});
};
var useFormField = () => {
	const fieldContext = import_react.useContext(FormFieldContext);
	const itemContext = import_react.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();
	const fieldState = getFieldState(fieldContext.name, formState);
	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");
	const { id } = itemContext;
	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	};
};
var FormItemContext = import_react.createContext({});
var FormItem = import_react.forwardRef(({ className, ...props }, ref) => {
	const id = import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItemContext.Provider, {
		"data-uid": "src/components/ui/form.tsx:75:7",
		"data-prohibitions": "[editContent]",
		value: { id },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/ui/form.tsx:76:9",
			"data-prohibitions": "[editContent]",
			ref,
			className: cn("space-y-2", className),
			...props
		})
	});
});
FormItem.displayName = "FormItem";
var FormLabel = import_react.forwardRef(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-uid": "src/components/ui/form.tsx:90:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn(error && "text-destructive", className),
		htmlFor: formItemId,
		...props
	});
});
FormLabel.displayName = "FormLabel";
var FormControl = import_react.forwardRef(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		"data-uid": "src/components/ui/form.tsx:107:5",
		"data-prohibitions": "[editContent]",
		ref,
		id: formItemId,
		"aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
		"aria-invalid": !!error,
		...props
	});
});
FormControl.displayName = "FormControl";
var FormDescription = import_react.forwardRef(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-uid": "src/components/ui/form.tsx:125:5",
		"data-prohibitions": "[editContent]",
		ref,
		id: formDescriptionId,
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
});
FormDescription.displayName = "FormDescription";
var FormMessage = import_react.forwardRef(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-uid": "src/components/ui/form.tsx:147:5",
		"data-prohibitions": "[editContent]",
		ref,
		id: formMessageId,
		className: cn("text-sm font-medium text-destructive", className),
		...props,
		children: body
	});
});
FormMessage.displayName = "FormMessage";
//#endregion
export { FormLabel as a, FormItem as i, FormControl as n, FormMessage as o, FormField as r, Form as t };

//# sourceMappingURL=form-D3BzudZl.js.map