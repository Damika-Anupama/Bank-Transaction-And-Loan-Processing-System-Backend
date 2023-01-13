									---Withdrawals Procedure---

*For checking account withdrawals

DELIMITER //
CREATE PROCEDURE checking_withdrawal_procedure(acc_id DOUBLE, withdrawal_amount DOUBLE)
BEGIN

	DECLARE balance DOUBLE;
    
	SELECT amount INTO balance FROM account WHERE account_id = acc_id;
	
    
    IF withdrawal_amount > balance THEN
	
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient balance';
    
    ELSE
    
    SET balance = balance - withdrawal_amount;
    
    UPDATE account
	SET amount = balance
	WHERE account_id = acc_id;
    
    INSERT INTO withdrawal (amount, account_id, withdrawal_time, withdrawal_fee)
	VALUES (withdrawal_amount, acc_id, CURDATE(), 0);
    
	END IF;
    
    
END //
    
DELIMITER ;




* This is used to call the procedure and account_id and withdrawal amount passed as Parameters

CALL checking_withdrawal_procedure(account_id, withdrawal_amount);





*For saving account withdrawals

DELIMITER //
CREATE PROCEDURE savings_withdrawal_procedure(acc_id DOUBLE, withdrawal_amount DOUBLE)
BEGIN

	DECLARE balance DOUBLE;
	DECLARE no_of_withdrawal int;
    DECLARE min_balance DOUBLE;
    
    
	select amount into balance from account where account_id = acc_id; 
	select no_of_withdrawals into no_of_withdrawal from saving_account where account_id = acc_id;
    select min_required_balance into min_balance from saving_account where account_id = acc_id;
    
    IF withdrawal_amount > balance THEN
	     SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient balance';
	
    
	ELSE IF no_of_withdrawal < 5 THEN
    
     set balance = balance - withdrawal_amount;
     
     IF min_balance <= balance THEN
     
	    UPDATE account
	 	SET amount = balance
	 	WHERE account_id = acc_id;
        
        SET no_of_withdrawal = no_of_withdrawal + 1;


	 	UPDATE saving_account
	 	SET no_of_withdrawals = no_of_withdrawal
	 	WHERE account_id = acc_id;


	 	INSERT INTO withdrawal (amount, account_id, withdrawal_time, withdrawal_fee)
	 	VALUES (withdrawal_amount, acc_id, CURDATE(), 0);
        
	ELSE
		
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Minimum balance Error';
        
    END IF;
		
	   
	 ELSE IF no_of_withdrawal >= 5 THEN
	     SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Done for the month';
         
	 END IF;
     END IF;
     END IF;
	
    
END //
    
DELIMITER ;



* This is used to call the procedure and account_id and withdrawal amount passed as Parameters

CALL saving_withdrawal_procedure(account_id, withdrawal_amount);


Every month end number of withdrawals column in saving_account should be reset back to 0.
Procedure for thhat process

DELIMITER //
CREATE PROCEDURE reset_no_of_withdrawals()
BEGIN
  UPDATE saving_account SET no_of_withdrawals = 0;
END //
DELIMITER ;

CREATE EVENT reset_column_withdrawal
ON SCHEDULE EVERY 1 MONTH
STARTS '2023-01-01 00:00:00'
DO
  CALL reset_no_of_withdrawals();



									---End of Withdrawals Procedure---


							--- Procedure to update savings account after adding interest to amoount ---


*Function to calculate interest rat(this will be used to return the updated account balance of a account holder)

CREATE FUNCTION calculate_interest (acc_number int)
RETURNS DOUBLE
DETERMINISTIC
BEGIN
	DECLARE balance decimal(12,2);
    DECLARE rate double;
	
    SELECT amount into balance from account where account_id = acc_number;
	SELECT CAST(CAST(interest_rate AS CHAR) AS SIGNED) into rate from saving_account where account_id = acc_number;
    
    SET balance = balance + balance*(rate/(1200));
    
RETURN balance;
END //
DELIMITER ;



*Procedure to update the amount of aacoount table after adding interest

DELIMITER //
 
CREATE PROCEDURE update_interest()
BEGIN

	DECLARE n INT DEFAULT 0;
	DECLARE i INT DEFAULT 0;
    DECLARE acc_id INT;
    
	SELECT COUNT(*) FROM saving_account INTO n;
	SET i=0;
	
    WHILE i<n DO
		SELECT account_id FROM saving_account LIMIT i,1 INTO acc_id;
		UPDATE account SET amount = calculate_interest (acc_id) where account_id = acc_id;
		SET i = i + 1;
	END WHILE;
End //
    
DELIMITER ;



*Event to call the procedure every month end


CREATE EVENT add_interest_to_savings
ON SCHEDULE EVERY 1 MONTH 
STARTS '2022-12-31 23:30:00'
DO
  CALL update_interest();



								--- End of update interest procedure ---






								---Monthly installment calculation---


*Procedure to calculate intallment(after this is created loan_basic_details table should have a new column for installment)




