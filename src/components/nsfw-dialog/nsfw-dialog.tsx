import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/shared/ui/alert-dialog'

interface NsfwDialogProps {
	url: string
	children: React.ReactNode
}

export const NsfwDialog = (props: NsfwDialogProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Esse link pode conter conteúdo NSFW, deseja continuar?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Se você for menor de idade, não clique em continuar.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction asChild>
						<a href={props.url} target='_blank' rel='noreferrer'>
							Continuar
						</a>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
