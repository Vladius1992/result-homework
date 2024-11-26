export const handleResult = ({
	operand2,
	operator,
	operand1,
	setOperand1,
	setOperand2,
	setOperator,
	setIsResult,
}) => {
	if (operand2 !== '') {
		switch (operator) {
			case '+': {
				setOperand1(Number(operand1) + Number(operand2));
				break;
			}
			case '-': {
				setOperand1(Number(operand1) - Number(operand2));
				break;
			}
			default:
			// ничего не делаем
		}

		setOperand2('');
	}

	setOperator('');
	setIsResult(true);
};
