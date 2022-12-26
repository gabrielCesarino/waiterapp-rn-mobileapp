import { Text } from "../Text";
import { Container } from "./styles";

interface ButtonProps {
	children: string,
	onPress: () => void,
	disabled?: boolean,
}

export function Button(props: ButtonProps) {
	return (
		<Container onPress={props.onPress} disabled={props.disabled}>
			<Text weight="600" color="#fff">{props.children}</Text>
		</Container>
	)
}
