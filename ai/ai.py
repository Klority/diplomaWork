# import asyncio
# asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import g4f
import sys


def generate_response(prompt):
    response = g4f.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )

    generated_response = ""
    for message in response:
        generated_response += message

    return generated_response

if __name__ == "__main__":

    prompt_from_client = sys.argv[1]

    response_to_client = generate_response(prompt_from_client)

    sys.stdout.reconfigure(encoding='utf-8')


    print(response_to_client)