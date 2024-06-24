"""
Ref - https://dev.mysql.com/doc/connector-python/en/connector-python-example-connecting.html
"""

import mysql.connector
import time


class DbConnection:
    def __init__(self) -> None:
        self.config = {
            "user": "root",
            "password": "",
            "host": "127.0.0.1",
            "database": "blogger_website",
            "raise_on_warnings": True,
        }

    def connect_to_mysql(self, attempts=3, delay=2):
        attempt = 1
        # Implement a reconnection routine
        while attempt < attempts + 1:
            try:
                return mysql.connector.connect(**self.config)
            except (mysql.connector.Error, IOError) as err:
                if attempts is attempt:
                    # Attempts to reconnect failed; returning None
                    # logger.info("Failed to connect, exiting without a connection: %s", err)
                    return None

                # progressive reconnect delay
                time.sleep(delay**attempt)
                attempt += 1
        return None

    def execute_query(self, query: str):
        cnx = self.connect_to_mysql(attempts=3)

        if cnx and cnx.is_connected():
            with cnx.cursor() as cursor:
                result = cursor.execute(query)

                rows = cursor.fetchall()

                for rows in rows:
                    print(rows)
            return result
            cnx.close()

        else:
            print("Could not connect")
