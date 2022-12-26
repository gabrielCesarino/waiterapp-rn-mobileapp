import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
	padding: 14px 24px;
	background: ${({disabled}) => disabled ? '#999' : '#d73035'};
	border-radius: 48px;
	align-items: center;
	justify-content: center;

	Text {
		text-transform: uppercase;
	}
`;
