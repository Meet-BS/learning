require File.expand_path(File.dirname(__FILE__) + '/neo')

class AboutKeywordArguments < Neo::Koan

  def method_with_keyword_arguments(one: 1, two: 'two')
    [one, two]
  end

  def test_keyword_arguments
    assert_equal Array, method_with_keyword_arguments.class             # The method returns an array
    assert_equal [1, 'two'], method_with_keyword_arguments              # Default values are used
    assert_equal ['one', 'two'], method_with_keyword_arguments(one: 'one') # Overriding the value of `one`
    assert_equal [1, 2], method_with_keyword_arguments(two: 2)          # Overriding the value of `two`
  end

  def method_with_keyword_arguments_with_mandatory_argument(one, two: 2, three: 3)
    [one, two, three]
  end

  def test_keyword_arguments_with_wrong_number_of_arguments
    exception = assert_raise(ArgumentError) do
      method_with_keyword_arguments_with_mandatory_argument
    end
    assert_match(/wrong number of arguments/, exception.message) # Error for missing the required `one` argument
  end

  def method_with_mandatory_keyword_arguments(one:, two: 'two')
    [one, two]
  end

  def test_mandatory_keyword_arguments
    assert_equal ['one', 'two'], method_with_mandatory_keyword_arguments(one: 'one') # Using default for `two`
    assert_equal [1, 2], method_with_mandatory_keyword_arguments(two: 2, one: 1)    # Overriding both values
  end

  def test_mandatory_keyword_arguments_without_mandatory_argument
    exception = assert_raise(ArgumentError) do
      method_with_mandatory_keyword_arguments
    end
    assert_match(/missing keyword: one/, exception.message) # Error for missing the required `one` keyword argument
  end

end
