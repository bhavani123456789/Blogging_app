"""
Ref - https://dev.mysql.com/doc/connector-python/en/connector-python-example-connecting.html
"""

import mysql.connector
import time

class DbConnection:
    def __init__(self) -> None:
        self.config = {
            "user": "root",
            "password": "",  # Update this if your MySQL has a password
            "host": "127.0.0.1",
            "database": "blogger_website",  # Make sure this DB exists
            "raise_on_warnings": True,
        }

    def connect_to_mysql(self, attempts=3, delay=2):
        attempt = 1
        # Implement a reconnection routine
        while attempt <= attempts:
            try:
                return mysql.connector.connect(**self.config)
            except (mysql.connector.Error, IOError) as err:
                if attempt == attempts:
                    print(f"Failed to connect: {err}")
                    return None
                time.sleep(delay ** attempt)
                attempt += 1
        return None

    def execute_query(self, query: str):
        cnx = self.connect_to_mysql(attempts=3)

        if cnx and cnx.is_connected():
            try:
                with cnx.cursor(dictionary=True) as cursor:
                    cursor.execute(query)
                    rows = cursor.fetchall()
                    return rows
            finally:
                cnx.close()
        else:
            print("Could not connect")
            return []
