import pandas as pd


def get_symbols_in_def(definition: str, c_symbols):
    if len(definition) == 0:
        return []

    df_values = list(filter(lambda p: p[1] >= 0, map(lambda cs: (cs, definition.find(cs)), c_symbols)))
    if len(df_values) == 0:
        return []
    df = pd.DataFrame(df_values, columns=["symbol", 'index_in_def'])

    sorted_df = df.sort_values(by='index_in_def')
    iteration_symbols = list(sorted_df['symbol'])
    last_symbol = sorted_df.iloc[-1]
    remaining_def = definition[last_symbol["index_in_def"] + len(last_symbol['symbol']):]
    return iteration_symbols + get_symbols_in_def(remaining_def, c_symbols)
