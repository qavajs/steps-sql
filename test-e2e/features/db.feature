Feature: db

  Scenario: execute multiline query
    When I execute SQL query:
    """
    select smth from some_table where smth = 42
    """
    Then I expect dummy client 'executions' property to be equal '$array("select smth from some_table where smth = 42")'

  Scenario: execute multiline query and save result
    When I execute SQL query and save result as 'sqlResult':
    """
    select * from some_table
    """
    Then I expect '$sqlResult' memory value to be equal '$expected'

  Scenario: execute single line query
    When I execute 'select smth from some_table where smth = 42' SQL query
    Then I expect dummy client 'executions' property to be equal '$array("select smth from some_table where smth = 42")'

  Scenario: execute single line query and save result
    When I execute 'select * from some_table' SQL query and save result as 'sqlResult'
    Then I expect '$sqlResult' memory value to be equal '$expected'
