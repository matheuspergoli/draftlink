import React from 'react'

import { cn } from '@/libs/utils'
import { Button, ButtonProps, buttonVariants } from '@/shared/ui/button'
import { Input, InputProps } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
const Form = React.forwardRef<HTMLFormElement, FormProps>(
	({ className, children, ...rest }, ref) => {
		return (
			<form {...rest} className={cn(className)} ref={ref}>
				{children}
			</form>
		)
	}
)
Form.displayName = 'Form'

interface FormGroupProps extends React.ParamHTMLAttributes<HTMLDivElement> {}
const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
	({ className, children, ...rest }, ref) => {
		return (
			<div {...rest} ref={ref} className={cn(className)}>
				{children}
			</div>
		)
	}
)
FormGroup.displayName = 'FormGroup'

interface FormInputProps extends InputProps {}
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
	({ className, ...rest }, ref) => {
		return <Input {...rest} ref={ref} className={cn(className)} />
	}
)
FormInput.displayName = 'FormInput'

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
	({ className, children, ...rest }, ref) => {
		return (
			<Label {...rest} ref={ref} className={cn(className)}>
				{children}
			</Label>
		)
	}
)
FormLabel.displayName = 'FormLabel'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
	({ className, ...rest }, ref) => {
		return <Textarea {...rest} ref={ref} className={cn(className)} />
	}
)
FormTextarea.displayName = 'FormTextarea'

interface FormButtonProps extends ButtonProps {}
const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
	({ className, children, type, variant, size, ...rest }, ref) => {
		return (
			<Button
				{...rest}
				ref={ref}
				className={cn(buttonVariants({ variant, size }), className)}
				type={type ?? 'submit'}>
				{children}
			</Button>
		)
	}
)
FormButton.displayName = 'FormButton'

export { Form, FormGroup, FormLabel, FormInput, FormTextarea, FormButton }
